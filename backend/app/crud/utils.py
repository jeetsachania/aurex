from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError


def commit(db: Session, obj):
    """
    Commit wallet changes to the database.

    Args:
        db (`Session`): SQLAlchemy database session.
        wallet (`Wallet`): The Wallet object.

    Returns:
        wallet (`Wallet`): The updated Wallet object.

    Raises:
        `IntegrityError`:
            - `400`: If the database operation fails.
    """
    try:
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj
    except IntegrityError:
        db.rollback()
        raise HTTPException(400, "Database operation failed")
