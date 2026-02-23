from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.services import session_auth


def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    """
    Allow API route access for authorised users

    Checks the current session for an access token and verifies its fields,
    raising an exception where appropriate and returning the user object on success

    Args:
        request (`request`):
        db (`Session`): SQLAlchemy database session

    Returns:
        user (`User`): User object
    """
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing or malformed"
        )

    token = auth_header[7:]

    try:
        payload = session_auth.decode_token(token)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

    session_auth.check_field(payload, "username")

    if session_auth.token_expired(payload):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")

    username = payload["username"]
    user = db.query(User).filter(User.username == username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return user


def role_required(role_name: str):
    """
    Allow API route access based on the required role

    Args:
        role_name (`str`): Role name

    Returns:
        user (`User`): User object
    """
    def role_dependency(user: User = Depends(get_current_user)):
        if not user.has_role(role_name):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Permission denied",
            )
        return user
    return role_dependency
