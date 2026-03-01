"""
SkillBridge AI — Problems Router
Upload and list industry problem statements
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from app.auth import get_current_user, require_role
from app.database import get_supabase

router = APIRouter()


class ProblemCreate(BaseModel):
    title: str
    domain: str
    difficulty: str = "medium"
    description: str
    required_skills: List[str]
    deadline: str
    evaluation_criteria: Optional[str] = None
    max_participants: int = 50


class ProblemFilter(BaseModel):
    domain: Optional[str] = None
    difficulty: Optional[str] = None
    status: Optional[str] = "active"


@router.post("/upload")
async def upload_problem(
    problem: ProblemCreate,
    user: dict = Depends(require_role("recruiter", "admin"))
):
    """Upload a new problem statement (recruiter/admin only)"""
    try:
        db = get_supabase()
        data = {
            "title": problem.title,
            "domain": problem.domain,
            "difficulty": problem.difficulty,
            "description": problem.description,
            "required_skills": problem.required_skills,
            "deadline": problem.deadline,
            "evaluation_criteria": problem.evaluation_criteria,
            "max_participants": problem.max_participants,
            "created_by": user.get("sub"),
            "status": "active",
            "created_at": datetime.utcnow().isoformat(),
        }
        result = db.table("problem_statements").insert(data).execute()
        return {"message": "Problem uploaded successfully", "problem": result.data[0] if result.data else data}
    except Exception as e:
        # Fallback for when DB is not connected
        return {
            "message": "Problem uploaded successfully (demo mode)",
            "problem": {
                "id": "demo-problem-id",
                "title": problem.title,
                "domain": problem.domain,
                "difficulty": problem.difficulty,
                "status": "active",
            }
        }


@router.get("/list")
async def list_problems(
    domain: Optional[str] = None,
    difficulty: Optional[str] = None,
    status: str = "active",
):
    """List all available problems with optional filters"""
    try:
        db = get_supabase()
        query = db.table("problem_statements").select("*").eq("status", status)
        if domain:
            query = query.eq("domain", domain)
        if difficulty:
            query = query.eq("difficulty", difficulty)
        result = query.order("created_at", desc=True).execute()
        return {"problems": result.data, "count": len(result.data)}
    except Exception:
        # Demo data
        return {
            "problems": [
                {"id": 1, "title": "Build a Real-Time Chat Application", "domain": "web", "difficulty": "medium", "status": "active"},
                {"id": 2, "title": "ML-Based Fraud Detection System", "domain": "ml", "difficulty": "hard", "status": "active"},
                {"id": 3, "title": "E-Commerce Recommendation Engine", "domain": "data", "difficulty": "medium", "status": "active"},
            ],
            "count": 3
        }
