from sqlalchemy.orm import Session

from app.models.wallet import Wallet
from app.models.currency import Currency


def get_all_currencies(db: Session) -> list:
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


def get_additional_currencies(db: Session, user_id: int) -> list[Currency]:
    user_currency_subquery = (
        db.query(Wallet.currency)
        .filter(Wallet.user_id == user_id)
        .subquery()
    )

    return (
        db.query(Currency)
        .filter(
            Currency.is_active.is_(True),
            ~Currency.code.in_(user_currency_subquery),
        )
        .all()
    )
