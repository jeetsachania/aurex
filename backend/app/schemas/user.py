from pydantic import BaseModel, constr, EmailStr

class UserCreate(BaseModel):
    """
    UserCreate Schema.

    Attributes:
        firstname (`str`): User's firstname.
        lastname (`str`): User's lastname.
        email (`EmailStr`): User's email address.
        username (`constr`): User's username.
        password (`constr`): User's password.
    """
    firstname: str
    lastname: str
    email: EmailStr
    username: constr(min_length=3, max_length=50)
    password: constr(min_length=6, max_length=72)

    class Config:
        """
        Parse the SQLAlchemy ORM model into a Pydantic model.
        """
        orm_mode = True

class UserResponse(BaseModel):
    """
    UserResponse Schema.

    Attributes:
        id (int): Auto-incremented unique ID.
        firstname (`str`): User's firstname.
        lastname (`str`): User's lastname.
        email (`EmailStr`): User's email address.
        username (`constr`): User's username.
    """
    id: int
    firstname: str
    lastname: str
    email: EmailStr
    username: str

    class Config:
        """
        Parse the SQLAlchemy ORM model into a Pydantic model.
        """
        orm_mode = True
