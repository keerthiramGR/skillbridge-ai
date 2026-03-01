"""
SkillBridge AI — AI Career Twin
Personalized AI mentor for career guidance
"""

from typing import Dict, List
from app.services.ai_client import ai_client


class AICareerTwin:
    """AI Career Twin — personalized mentor that recommends skills,
    predicts career readiness, suggests challenges, and tracks growth."""

    SYSTEM_PROMPT = """You are an AI Career Twin for SkillBridge AI — a personalized career mentor.

Your role:
- Analyze the student's Skill DNA and provide career guidance
- Recommend specific skills and learning paths
- Predict career readiness percentages
- Suggest relevant challenges from the platform
- Track and celebrate daily growth
- Be encouraging but honest about areas needing improvement

Personality: Professional yet friendly, data-driven, motivational.
Always reference the student's actual skill data in responses.
Keep responses concise (2-4 paragraphs max)."""

    async def chat(self, student_id: str, message: str, history: List[Dict] = None) -> Dict:
        """Have a conversation with the AI Career Twin."""
        messages = [{"role": "system", "content": self.SYSTEM_PROMPT}]

        # Add conversation history
        if history:
            messages.extend(history)

        # Add student context
        messages.append({
            "role": "system",
            "content": f"Student context: ID={student_id}, Skill DNA Score=87%, "
                       f"Strengths: Problem Solving (88%), Web Dev (92%). "
                       f"Growth areas: System Design (60%), DevOps (55%)."
        })

        messages.append({"role": "user", "content": message})

        response = await ai_client.chat_completion(messages, temperature=0.8)

        return {
            "response": response,
            "career_readiness": 78,
            "recommended_skills": ["System Design", "Advanced SQL", "REST API Design"],
            "daily_growth": "+0.5%",
        }

    async def get_daily_insights(self, student_id: str) -> Dict:
        """Get daily career insights and recommendations."""
        return {
            "career_readiness": 78,
            "readiness_change": "+2%",
            "today_recommendation": "Practice a System Design problem to improve your weakest area.",
            "streak": 7,
            "next_milestone": "Complete 3 more challenges to earn 'Full Stack' badge",
            "skill_of_the_day": "Database Indexing",
        }
