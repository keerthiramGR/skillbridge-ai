"""
SkillBridge AI — Database Client
Supabase initialization
"""

from supabase import create_client, Client
from app.config import settings

supabase: Client = None


def get_supabase() -> Client:
    """Get or create Supabase client instance."""
    global supabase
    if supabase is None:
        if settings.SUPABASE_URL and settings.SUPABASE_ANON_KEY:
            supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
        else:
            raise ConnectionError(
                "Supabase credentials not configured. "
                "Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables."
            )
    return supabase


def get_supabase_admin() -> Client:
    """Get Supabase client with service role key for admin operations."""
    if settings.SUPABASE_URL and settings.SUPABASE_SERVICE_ROLE_KEY:
        return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
    raise ConnectionError("Supabase service role key not configured.")
