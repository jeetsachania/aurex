from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.models.user import User

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
            status_code=status.HTTP_401_UNAUTHORIZED
        )
    if not pwd_context.verify(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED
        )
    return user
