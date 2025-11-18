from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.auth import authenticate_user, create_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, db: Session = Depends(get_db)) -> UserResponse:
    """
    Register a user.

    Validates that the email address and username provided are unique.
    If so, the password is hashed and the user is stored in the database,
    returning the created users information.

    Args:
        user (`UserCreate`): Data used to create the new user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        `UserResponse`: The newly created user's public data.

    Raises:
        `HTTPException`:
            - `400`: If the email address is already registered.
            - `400`: If the username is taken.
    """
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken")

    new_user = User(
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email,
        username=user.username,
        hashed_password=pwd_context.hash(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return UserResponse(
        id=new_user.id,
        firstname=new_user.firstname,
        lastname=new_user.lastname,
        email=new_user.email,
        username=new_user.username
    )

@router.post("/login")
async def login_user(user: UserLogin, db: Session = Depends(get_db)) -> dict:
    """
    Login a user.

    Authenticates the user against the database using their
    username and password, creating and returning an access token
    if authenticated.

    Args:
        user (`UserCreate`): Data used to create the new user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        `dict`: The created access token for the authenticated user.
    """
    db_user = authenticate_user(db=db, username=user.username, password=user.password)
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}
