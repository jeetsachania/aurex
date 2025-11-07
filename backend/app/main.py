from fastapi import FastAPI
from app.api.routes import users

app = FastAPI(title="Trading App API")
app.include_router(users.router, prefix="/users", tags=["Users"])

@app.get("/")
def root():
    return {"message": "Backend running successfully!"}