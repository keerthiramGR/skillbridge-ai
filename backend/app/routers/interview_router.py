"""
SkillBridge AI — Interview Router
AI Shadow Interviewer evaluation
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Optional

from app.auth import get_current_user
from app.services.interviewer import AIInterviewer

router = APIRouter()
interviewer = AIInterviewer()


class InterviewRequest(BaseModel):
    interview_type: str = "technical"  # technical, behavioral, system-design, coding
    answers: List[str] = []
    context: Optional[str] = None


@router.post("/evaluate")
async def evaluate_interview(
    request: InterviewRequest,
    user: dict = Depends(get_current_user)
):
    """AI-powered interview evaluation"""
    result = await interviewer.evaluate(
        student_id=user.get("sub"),
        interview_type=request.interview_type,
        answers=request.answers,
        context=request.context,
    )
    return result


@router.get("/questions/{interview_type}")
async def get_interview_questions(
    interview_type: str,
    user: dict = Depends(get_current_user)
):
    """Get AI-generated interview questions"""
    questions = await interviewer.generate_questions(interview_type)
    return {"questions": questions, "type": interview_type}
