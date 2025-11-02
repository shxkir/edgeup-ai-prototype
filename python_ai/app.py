from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class ProfileRequest(BaseModel):
    answers: List[int]

class QuizRequest(BaseModel):
    topic: str
    difficulty: int

class PlanRequest(BaseModel):
    strengths: List[str]
    weaknesses: List[str]

@app.get("/")
async def root():
    return {"message": "EdgeUp AI service"}

@app.post("/profile")
async def profile(req: ProfileRequest):
    return {"profile": "balanced"}

@app.post("/quiz")
async def quiz(req: QuizRequest):
    return {"questions": [f"{req.topic} question {i}" for i in range(1, 4)]}

@app.post("/study-plan")
async def study_plan(req: PlanRequest):
    return {"plan": {"day1": req.weaknesses, "day2": req.strengths}}
