"""
SkillBridge AI — FastAPI Main Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import (
    auth_router,
    problems_router,
    submissions_router,
    skills_router,
    interview_router,
    recommendations_router,
    dashboard_router,
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-driven skill intelligence platform — bridging student skills with industry opportunities.",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:3000",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router.router, prefix="/auth", tags=["Authentication"])
app.include_router(problems_router.router, prefix="/problems", tags=["Problems"])
app.include_router(submissions_router.router, prefix="/submissions", tags=["Submissions"])
app.include_router(skills_router.router, prefix="/skills", tags=["Skills"])
app.include_router(interview_router.router, prefix="/interview", tags=["Interview"])
app.include_router(recommendations_router.router, prefix="/recommendations", tags=["Recommendations"])
app.include_router(dashboard_router.router, prefix="/dashboard", tags=["Dashboard"])


@app.get("/", tags=["Root"])
async def root():
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "operational",
        "message": "SkillBridge AI API is running."
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "healthy", "service": settings.APP_NAME}
