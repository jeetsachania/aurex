from sqlalchemy.orm import Session

from backend.app.crud.utils import get
from backend.app.models.rbac import Role
from backend.app.models.user import User


def assign_role(db: Session, user: User, role: str):
    """
    Assign the given role to the given user when creating an account

    Args:
        db (`Session`): SQLAlchemy database session
        user (`User`): User object
        role (`str`): Role
    """
    _role = get(db, Role, name=role)
    if _role:
        user.roles.append(_role)
        db.commit()
