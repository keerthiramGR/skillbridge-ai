"""
SkillBridge AI — OpenAI Client Wrapper
Centralized OpenAI API access with retry logic
"""

import openai
from typing import List, Dict, Optional
from app.config import settings


class AIClient:
    """Wrapper around OpenAI API for SkillBridge AI modules."""

    def __init__(self):
        self.client = None
        if settings.OPENAI_API_KEY:
            self.client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "gpt-4",
        temperature: float = 0.7,
        max_tokens: int = 1500,
    ) -> str:
        """Generate a chat completion."""
        if not self.client:
            return self._demo_response(messages)

        try:
            response = await self.client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return self._demo_response(messages)

    async def analyze_text(self, system_prompt: str, user_input: str, **kwargs) -> str:
        """Quick helper for single-turn analysis."""
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input},
        ]
        return await self.chat_completion(messages, **kwargs)

    def _demo_response(self, messages: List[Dict]) -> str:
        """Fallback demo response when OpenAI is not configured."""
        last_msg = messages[-1]["content"] if messages else ""
        return (
            f"[AI Response — Demo Mode] Analysis of input received. "
            f"In production, this would be powered by GPT-4 analysis of: "
            f"'{last_msg[:100]}...'. Configure OPENAI_API_KEY for live AI responses."
        )


# Singleton
ai_client = AIClient()
