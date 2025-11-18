from datetime import datetime, timedelta
from typing import Optional

from fastapi import HTTPException, status
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.models.user import User

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def authenticate_user(db: Session, username: str, password: str) -> User:
    """
    Authenticate a user.

    Validates that there is a match for the provided username and password,
    returning the user's information if validated.

    Args:
        db (`Session`): SQLAlchemy database session.
        username (`str`): The user's username.
        password (`str`): The user's password.

    Returns:
        user (`sqlalchemy.orm.Query.filter.first`): The user's information.

    Raises:
        `HTTPException`:
            - `401`: If the username is not found.
            - `401`: If the password is invalid.
    """
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User Not Found",
        )
    if not pwd_context.verify(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Password",
        )
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create an access token for an authenticated user.

    Generates an access token with a secret key and an optional expiry.

    Args:
        data (`dict`): A dict holding access token information.
        expires_delta (`Optional[timedelta]`): Expiry time.

    Returns:
        encoded_jwt (`jwt.encode`): The JWT.
    """
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
