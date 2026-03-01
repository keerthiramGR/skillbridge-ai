"""
SkillBridge AI — Skills Router
Skill DNA analysis and profile generation
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional

from app.auth import get_current_user, require_role
from app.services.skill_dna import SkillDNAEngine

router = APIRouter()
skill_engine = SkillDNAEngine()


class SkillAnalysisRequest(BaseModel):
    student_id: Optional[str] = None


@router.post("/analyze")
async def analyze_skills(
    request: SkillAnalysisRequest,
    user: dict = Depends(get_current_user)
):
    """Trigger AI Skill DNA analysis for a student"""
    student_id = request.student_id or user.get("sub")
    result = await skill_engine.analyze(student_id)
    return result


@router.get("/profile/{student_id}")
async def get_skill_profile(
    student_id: str,
    user: dict = Depends(get_current_user)
):
    """Get a student's Skill DNA profile"""
    profile = await skill_engine.get_profile(student_id)
    return {"profile": profile}
