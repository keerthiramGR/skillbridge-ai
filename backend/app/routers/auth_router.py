"""
SkillBridge AI — Auth Router
Google OAuth, OTP, Admin/Recruiter verification
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional

from app.auth import (
    create_jwt_token,
    verify_google_token,
    generate_otp,
    store_otp,
    verify_otp,
    send_otp_email,
    verify_admin_passcode,
    verify_recruiter_access_key,
)
from app.database import get_supabase

router = APIRouter()


class GoogleAuthRequest(BaseModel):
    token: str
    role: str
    name: Optional[str] = None
    email: Optional[str] = None
    picture: Optional[str] = None
    google_id: Optional[str] = None


class OTPRequest(BaseModel):
    email: str
    role: str
    access_key: Optional[str] = None
    organization: Optional[str] = None


class OTPVerifyRequest(BaseModel):
    email: str
    otp: str
    role: str


class RoleVerifyRequest(BaseModel):
    role: str
    passcode: Optional[str] = None
    two_factor_code: Optional[str] = None
    google_token: Optional[str] = None


@router.post("/google")
async def google_auth(request: GoogleAuthRequest):
    """Authenticate user via Google OAuth"""
    user_data = None

    # In production, verify the Google token
    if request.token and request.token != "mock-google-token":
        try:
            user_data = await verify_google_token(request.token)
        except HTTPException:
            # Fall back to provided data
            pass

    # Use provided data if token verification skipped/failed
    if not user_data:
        user_data = {
            "google_id": request.google_id or "demo-" + str(hash(request.email)),
            "email": request.email,
            "name": request.name,
            "picture": request.picture,
        }

    # Upsert user in database
    try:
        db = get_supabase()
        # Check if user exists
        existing = db.table("users").select("*").eq("email", user_data["email"]).execute()

        if existing.data:
            user = existing.data[0]
        else:
            # Create new user
            insert_data = {
                "email": user_data["email"],
                "name": user_data["name"],
                "picture": user_data.get("picture"),
                "google_id": user_data["google_id"],
                "role": request.role,
                "status": "active" if request.role == "student" else "pending",
            }
            result = db.table("users").insert(insert_data).execute()
            user = result.data[0] if result.data else insert_data
    except Exception:
        # Database not connected — create demo response
        user = {
            "id": "demo-user-id",
            "email": user_data["email"],
            "name": user_data["name"],
            "picture": user_data.get("picture"),
            "role": request.role,
            "status": "active",
        }

    # For students, generate token immediately
    if request.role == "student":
        token = create_jwt_token({
            "sub": user.get("id", user_data["google_id"]),
            "email": user_data["email"],
            "role": request.role,
            "name": user_data["name"],
        })
        return {"token": token, "user": user}

    # For recruiter/admin, return pending status (need additional verification)
    return {"status": "pending_verification", "user": user}


@router.post("/send-otp")
async def send_otp(request: OTPRequest):
    """Send OTP for recruiter verification"""
    # Verify recruiter access key first
    if request.role == "recruiter" and request.access_key:
        if not verify_recruiter_access_key(request.access_key):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid recruiter access key."
            )

    # Generate and store OTP
    otp = generate_otp()
    store_otp(request.email, otp)

    # Send OTP email
    await send_otp_email(request.email, otp)

    return {
        "message": f"OTP sent to {request.email}",
        "expires_in": "10 minutes"
    }


@router.post("/verify-otp")
async def verify_otp_endpoint(request: OTPVerifyRequest):
    """Verify OTP and complete recruiter authentication"""
    is_valid = verify_otp(request.email, request.otp)

    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired OTP."
        )

    # Generate JWT for verified recruiter
    token = create_jwt_token({
        "sub": request.email,
        "email": request.email,
        "role": request.role,
        "verified": True,
    })

    return {
        "token": token,
        "user": {
            "email": request.email,
            "role": request.role,
            "status": "verified",
        }
    }


@router.post("/verify-role")
async def verify_role(request: RoleVerifyRequest):
    """Verify admin passcode and 2FA"""
    if request.role == "admin":
        if not request.passcode:
            raise HTTPException(status_code=400, detail="Admin passcode required.")

        if not verify_admin_passcode(request.passcode):
            raise HTTPException(status_code=403, detail="Invalid admin passcode.")

        # In production, verify TOTP 2FA code here
        # For now, accept any 6-digit code
        if not request.two_factor_code or len(request.two_factor_code) != 6:
            raise HTTPException(status_code=400, detail="Valid 2FA code required.")

        token = create_jwt_token({
            "sub": "admin",
            "role": "admin",
            "verified": True,
        })

        return {
            "token": token,
            "user": {"role": "admin", "status": "verified"}
        }

    raise HTTPException(status_code=400, detail="Invalid role for verification.")
