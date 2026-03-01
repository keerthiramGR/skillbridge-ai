"""
SkillBridge AI — Authentication Utilities
JWT, Google Token Validation, OTP, Admin Passcode
"""

import random
import string
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict

from jose import JWTError, jwt
from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx

from app.config import settings

security = HTTPBearer()

# In-memory OTP storage (use Redis in production)
otp_store: Dict[str, Dict] = {}


# ---- JWT ----
def create_jwt_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.JWT_EXPIRATION_MINUTES))
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def verify_jwt_token(token: str) -> dict:
    """Verify and decode a JWT token."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}"
        )


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Dependency to get the current authenticated user from JWT."""
    return verify_jwt_token(credentials.credentials)


def require_role(*roles: str):
    """Dependency factory to require specific roles."""
    async def role_checker(user: dict = Depends(get_current_user)):
        if user.get("role") not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions for this action."
            )
        return user
    return role_checker


# ---- Google Token Validation ----
async def verify_google_token(token: str) -> dict:
    """Verify a Google OAuth ID token."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
            )
            if response.status_code == 200:
                data = response.json()
                if data.get("aud") == settings.GOOGLE_CLIENT_ID:
                    return {
                        "google_id": data.get("sub"),
                        "email": data.get("email"),
                        "name": data.get("name"),
                        "picture": data.get("picture"),
                        "email_verified": data.get("email_verified") == "true"
                    }
                raise HTTPException(status_code=401, detail="Invalid Google token audience.")
            raise HTTPException(status_code=401, detail="Failed to verify Google token.")
    except httpx.RequestError:
        raise HTTPException(status_code=503, detail="Unable to reach Google verification service.")


# ---- OTP System ----
def generate_otp(length: int = 6) -> str:
    """Generate a random numeric OTP."""
    return ''.join(random.choices(string.digits, k=length))


def store_otp(email: str, otp: str, ttl_minutes: int = 10):
    """Store OTP with expiration."""
    otp_store[email] = {
        "otp": otp,
        "expires_at": datetime.now(timezone.utc) + timedelta(minutes=ttl_minutes),
        "attempts": 0
    }


def verify_otp(email: str, otp: str) -> bool:
    """Verify an OTP for an email."""
    stored = otp_store.get(email)
    if not stored:
        return False

    if datetime.now(timezone.utc) > stored["expires_at"]:
        del otp_store[email]
        return False

    stored["attempts"] += 1
    if stored["attempts"] > 5:
        del otp_store[email]
        raise HTTPException(status_code=429, detail="Too many OTP attempts. Request a new code.")

    if stored["otp"] == otp:
        del otp_store[email]
        return True
    return False


async def send_otp_email(email: str, otp: str):
    """Send OTP via email."""
    try:
        msg = MIMEText(
            f"Your SkillBridge AI verification code is: {otp}\n\n"
            f"This code expires in 10 minutes.\n\n"
            f"If you did not request this code, please ignore this email.",
            "plain"
        )
        msg["Subject"] = f"SkillBridge AI — Verification Code: {otp}"
        msg["From"] = settings.SMTP_USER
        msg["To"] = email

        if settings.SMTP_USER and settings.SMTP_PASSWORD:
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
    except Exception as e:
        # Log error but don't fail — OTP still stored for verification
        print(f"Email send error: {e}")


# ---- Admin Verification ----
def verify_admin_passcode(passcode: str) -> bool:
    """Verify admin passcode."""
    return passcode == settings.ADMIN_PASSCODE


def verify_recruiter_access_key(key: str) -> bool:
    """Verify recruiter access key."""
    return key == settings.RECRUITER_ACCESS_KEY
