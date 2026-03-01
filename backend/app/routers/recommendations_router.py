"""
SkillBridge AI — Recommendations Router
AI-powered talent matching and recommendations
"""

from fastapi import APIRouter, Depends
from typing import Optional

from app.auth import get_current_user
from app.services.talent_matching import TalentMatchingEngine

router = APIRouter()
matching_engine = TalentMatchingEngine()


@router.get("/get")
async def get_recommendations(
    role: Optional[str] = None,
    user: dict = Depends(get_current_user)
):
    """Get AI recommendations based on user role"""
    user_role = role or user.get("role")

    if user_role == "student":
        # Get career and skill recommendations
        result = await matching_engine.get_student_recommendations(user.get("sub"))
    elif user_role == "recruiter":
        # Get candidate recommendations
        result = await matching_engine.get_recruiter_recommendations(user.get("sub"))
    else:
        result = {"recommendations": []}

    return result


@router.get("/match/{problem_id}")
async def get_matches_for_problem(
    problem_id: str,
    user: dict = Depends(get_current_user)
):
    """Get AI-matched candidates for a specific problem"""
    matches = await matching_engine.match_candidates_to_problem(problem_id)
    return {"matches": matches, "problem_id": problem_id}
