from pydantic import BaseModel, EmailStr, constr

class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    username: constr(min_length=3, max_length=50)
    password: constr(min_length=6, max_length=72)

    class Config:
        orm_mode = True

class UserResponse(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: EmailStr
    username: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str
