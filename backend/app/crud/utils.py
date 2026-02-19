from typing import Any

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session


def commit(db: Session, cls: Any) -> Any:
    """
    Commit SQLAlchemy instance changes to the database

    Args:
        db (`Session`): SQLAlchemy database session
        cls (`Any`): SQLAlchemy declarative model class

    Returns:
        cls (`Any`): SQLAlchemy declarative model class

    Raises:
        `IntegrityError`:
            - `400`: If the database operation fails
    """
    try:
        db.add(cls)
        db.commit()
        db.refresh(cls)
        return cls
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(400, str(e.orig))


def exists(db: Session, cls: Any, **kwargs) -> bool:
    """
    Check existence of an SQLAlchemy instance using its ID

    Queries the database for the instance, returning True
    if it exists and False otherwise

    Args:
        db (`Session`): SQLAlchemy database session
        cls (`Any`): SQLAlchemy declarative model class
        **kwargs: Optional fields to filter query

    Returns:
        `bool`: True if the instance exists, False otherwise
    """
    return db.query(cls.id).filter_by(**kwargs).first() is not None


def get(db: Session, cls: Any, message, **kwargs) -> Any:
    """
    Fetch an SQLAlchemy instance of type `cls`

    Args:
        db (`Session`): SQLAlchemy database session
        cls (`Any`): SQLAlchemy declarative model class
        **kwargs: Optional fields to filter query

    Returns:
        obj (`Any`): SQLAlchemy instance
    """
    obj = db.query(cls).filter_by(**kwargs).one_or_none()

    return obj


def get_all(db: Session, cls: Any, message, **kwargs) -> Any:
    """
    Fetch all SQLAlchemy instances of type `cls`

    Args:
        db (`Session`): SQLAlchemy database session
        cls (`Any`): SQLAlchemy declarative model class
        **kwargs: Optional fields to filter query

    Returns:
        objects (`Any`): SQLAlchemy instances
    """
    objects = db.query(cls).filter_by(**kwargs).all()

    return objects
