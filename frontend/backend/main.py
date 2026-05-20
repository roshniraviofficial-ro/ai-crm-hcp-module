from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI CRM Backend Running"}

@app.post("/interactions")
def save_interaction(data: dict):
    return {
        "message": "Interaction saved successfully",
        "data": data
    }