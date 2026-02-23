from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.crud.utils import commit, exists, get
from app.db.database import get_db
from app.db.user_auth import authenticate_user
from app.models.user import User
from app.schemas.user import UserRegister, UserResponse, UserLogin, UserEmail
from app.services.session_auth import create_token, decode_token, token_expired
from config import settings


ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
REFRESH_TOKEN_EXPIRE_MINUTES = settings.REFRESH_TOKEN_EXPIRE_MINUTES

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()


class RefreshTokenRequest(BaseModel):
    refresh_token: str


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserRegister, db: Session = Depends(get_db)) -> UserResponse:
    """
    Register a user

    Validates that the email address and username provided are unique.
    If so, the password is hashed and the user is stored in the database,
    returning the created users information

    Args:
        user (`UserCreate`): Data used to create the new user
        db (`Session`): SQLAlchemy database session

    Returns:
        `UserResponse`: The newly created user's public data

    Raises:
        `HTTPException`:
            - `400`: If the email address is already registered
            - `400`: If the username is taken
    """
    if exists(db, User, email=user.email):
        raise HTTPException(
            status_code=status.HTTP_200_OK,
            detail="Please check your inbox"
        )

    if exists(db, User, username=user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )

    new_user = User(
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email,
        username=user.username,
        hashed_password=pwd_context.hash(user.password)
    )

    return commit(db, new_user)


@router.post("/login")
async def login_user(user: UserLogin, db: Session = Depends(get_db)) -> dict:
    """
    Login a user

    Authenticates the user against the database using their
    username and password, creating and returning an access token
    if authenticated

    Args:
        username (`str`): The user's username
        password (`str`): The user's password
        db (`Session`): SQLAlchemy database session

    Returns:
        `dict`: The created access token for the authenticated user
    """
    db_user = authenticate_user(db=db, username=user.username, password=user.password)
    access_token = create_token(data={"username": db_user.username}, expiry_minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token = create_token(data={"username": db_user.username}, expiry_minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    print("ACCESS_TOKEN", access_token)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


@router.post("/exists")
async def user_exists(user: UserEmail, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    return True if db_user != None else False


@router.post("/refresh_token")
async def refresh_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)) -> dict:
    """
    Refreshes the access token using a valid refresh token

    Args:
        payload (`RefreshTokenRequest`): The refresh token request
        db (`Session`): SQLAlchemy database session

    Returns:
        dict: A new access token for the authenticated user
    """
    decoded_payload = decode_token(payload.refresh_token)

    if token_expired(decoded_payload):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )

    username = decoded_payload.get("username")

    if not exists(db, User, username=username):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    db_user = get(db, User, username=username)

    new_access_token = create_token(data={"username": db_user.username}, expiry_minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }


@router.get("/settings")
async def get_info(user: User = Depends(get_current_user)):
    return {
        "status": 200,
        "email": user.email,
        "username": user.username
    }
