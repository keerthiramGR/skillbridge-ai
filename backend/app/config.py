"""
SkillBridge AI — Configuration
Pydantic Settings from environment variables
"""

from pydantic_settings import BaseSettings
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    # App
    APP_NAME: str = "SkillBridge AI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # Supabase
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

    # Google OAuth
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")

    # JWT
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "skillbridge-secret-key-change-in-production")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 60

    # OpenAI
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

    # Security
    RECRUITER_ACCESS_KEY: str = os.getenv("RECRUITER_ACCESS_KEY", "SKILLBRIDGE-REC-2026")
    ADMIN_PASSCODE: str = os.getenv("ADMIN_PASSCODE", "SKILLBRIDGE-ADMIN-SECURE-2026")

    # SMTP for OTP
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")

    # CORS
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    class Config:
        env_file = ".env"
        extra = "allow"


settings = Settings()
