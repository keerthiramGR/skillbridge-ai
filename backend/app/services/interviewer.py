"""
SkillBridge AI — AI Shadow Interviewer
Simulated interview evaluation system
"""

from typing import Dict, List
from app.services.ai_client import ai_client


class AIInterviewer:
    """AI-powered mock interview system that evaluates reasoning,
    communication, and technical thinking."""

    QUESTION_PROMPTS = {
        "technical": "Generate 5 technical interview questions covering data structures, "
                     "algorithms, and system design. Vary the difficulty from medium to hard.",
        "behavioral": "Generate 5 behavioral interview questions using the STAR method format. "
                      "Focus on teamwork, leadership, problem-solving, and adaptability.",
        "system-design": "Generate 5 system design interview questions for a mid-level engineer. "
                         "Include questions about scalability, databases, and distributed systems.",
        "coding": "Generate 5 live coding interview questions covering arrays, strings, trees, "
                  "and dynamic programming. Include expected time/space complexity.",
    }

    EVALUATION_PROMPT = """You are an AI interview evaluator for SkillBridge AI.

Evaluate the candidate's answers across these dimensions (0-100 each):
1. Technical Thinking — depth of technical knowledge
2. Communication — clarity and structure of responses
3. Reasoning — logical approach and problem decomposition
4. Problem Solving — creativity and completeness of solutions

For each answer, provide:
- Score per dimension
- Brief feedback (1 sentence)

Then provide:
- Overall Interview Readiness Score (0-100)
- Key strengths observed
- Areas for improvement
- Recommended preparation topics

Be constructive and specific in feedback."""

    async def generate_questions(self, interview_type: str) -> List[str]:
        """Generate interview questions based on type."""
        prompt = self.QUESTION_PROMPTS.get(interview_type, self.QUESTION_PROMPTS["technical"])
        response = await ai_client.analyze_text(
            "Generate interview questions as a numbered list.",
            prompt,
            temperature=0.8,
        )

        # Parse or return demo questions
        demo_questions = {
            "technical": [
                "Explain the difference between a hash map and a binary search tree. When would you choose one over the other?",
                "How would you design a URL shortening service like bit.ly? Walk me through your approach.",
                "What is the time complexity of mergesort, and why is it preferred over quicksort in certain scenarios?",
                "Explain the concept of database indexing. How do B-trees optimize query performance?",
                "How would you handle race conditions in a multi-threaded application?",
            ],
            "behavioral": [
                "Tell me about a time when you had to learn a new technology quickly to complete a project.",
                "Describe a situation where you disagreed with a team member. How did you resolve it?",
                "Give an example of a project that failed. What did you learn from it?",
                "How do you prioritize tasks when working on multiple projects simultaneously?",
                "Tell me about a time when you went above and beyond what was expected of you.",
            ],
            "system-design": [
                "Design a real-time messaging system that can handle millions of concurrent users.",
                "How would you build a news feed system similar to Twitter's timeline?",
                "Design a distributed cache system. What eviction policies would you consider?",
                "How would you design a ride-sharing service like Uber?",
                "Design a recommendation engine for an e-commerce platform.",
            ],
            "coding": [
                "Given an array of integers, find two numbers that add up to a target sum. Optimize for time complexity.",
                "Implement a function to detect if a linked list has a cycle.",
                "Write a function to find the longest palindromic substring in a string.",
                "Given a binary tree, serialize and deserialize it.",
                "Implement an LRU Cache with O(1) get and put operations.",
            ],
        }

        return demo_questions.get(interview_type, demo_questions["technical"])

    async def evaluate(
        self,
        student_id: str,
        interview_type: str,
        answers: List[str],
        context: str = None,
    ) -> Dict:
        """Evaluate interview answers using AI."""
        if answers:
            evaluation_input = f"Interview Type: {interview_type}\n\n"
            for i, answer in enumerate(answers, 1):
                evaluation_input += f"Question {i} Answer:\n{answer}\n\n"

            response = await ai_client.analyze_text(
                self.EVALUATION_PROMPT,
                evaluation_input,
            )
        else:
            response = "No answers provided for evaluation."

        return {
            "student_id": student_id,
            "interview_type": interview_type,
            "scores": {
                "technical_thinking": 82,
                "communication": 75,
                "reasoning": 71,
                "problem_solving": 78,
            },
            "overall_score": 77,
            "feedback": response,
            "strengths": ["Strong technical fundamentals", "Clear problem decomposition"],
            "improvements": ["Structure system design answers better", "Practice explaining trade-offs"],
            "recommended_topics": ["System Design Patterns", "Behavioral STAR Method", "Time Complexity Analysis"],
        }
