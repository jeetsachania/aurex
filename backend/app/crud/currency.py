from sqlalchemy.orm import Session

from app.models.currency import Currency


def get_all(db: Session) -> list:
    """
    Fetches all currencies.

    Args:
        db (`Session`): SQLAlchemy database session.

    Returns:
        `list[Currency]`: List of all currency objects.
    """
    return db.query(Currency).all()


def exists(db: Session, currency: str) -> bool:
    """
    Check if a wallet with the given currency exists for the given user.

    Queries the database for the wallet, returning True if the wallet
    exists, and False otherwise.

    Args:
        db (`Session`): SQLAlchemy database session.
        currency (`str`): The currency of the wallet.

    Returns:
        `bool`: True if the wallet exists, False otherwise.
    """
    return db.query(Currency).filter(
        Currency.code == currency
    ).first() is not None
