"""
SkillBridge AI — Dashboard Router
Platform analytics and dashboard data
"""

from fastapi import APIRouter, Depends

from app.auth import get_current_user, require_role
from app.database import get_supabase

router = APIRouter()


@router.get("/analytics")
async def get_analytics(user: dict = Depends(require_role("admin"))):
    """Get platform analytics (admin only)"""
    try:
        db = get_supabase()
        users = db.table("users").select("id", count="exact").execute()
        problems = db.table("problem_statements").select("id", count="exact").execute()
        submissions = db.table("submissions").select("id", count="exact").execute()

        return {
            "total_users": users.count or 0,
            "total_problems": problems.count or 0,
            "total_submissions": submissions.count or 0,
            "active_recruiters": 42,
            "hiring_rate": 0.24,
        }
    except Exception:
        return {
            "total_users": 1284,
            "total_problems": 87,
            "total_submissions": 456,
            "active_recruiters": 42,
            "hiring_rate": 0.24,
            "note": "Demo data — connect Supabase for live metrics"
        }


@router.get("/student-stats")
async def get_student_stats(user: dict = Depends(get_current_user)):
    """Get student dashboard statistics"""
    return {
        "problems_solved": 12,
        "skill_dna_score": 87,
        "badges_earned": 8,
        "interview_score": 74,
        "career_readiness": 78,
        "weekly_growth": 5,
    }


@router.get("/recruiter-stats")
async def get_recruiter_stats(user: dict = Depends(require_role("recruiter"))):
    """Get recruiter dashboard statistics"""
    return {
        "active_challenges": 5,
        "total_submissions": 47,
        "top_candidates": 18,
        "hires_made": 3,
    }
