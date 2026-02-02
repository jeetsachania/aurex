from decimal import Decimal

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.models.wallet import Wallet

def get(db: Session, user_id: int, currency: str) -> Wallet:
    """
    Get the wallet for the given currency and user ID.

    Queries the database for the wallet, raising an exception if the wallet
    does not exist, returning the wallet otherwise.

    Args:
        db (`Session`): SQLAlchemy database session.
        user_id (`int`): The user's ID.
        currency (`str`): The currency of the wallet.

    Returns:
        wallet (`Wallet`): The Wallet object.

    Raises:
        `HTTPException`:
            - `404`: If the wallet does not exist.
    """
    wallet = db.query(Wallet).filter(
        Wallet.user_id == user_id,
        Wallet.currency == currency
    ).first()

    if not wallet:
        raise HTTPException(404, f"Wallet '{wallet}' does not exist")

    return wallet


def exists(db: Session, user_id: int, currency: str) -> bool:
    """
    Check if a wallet with the given currency exists for the given user.

    Queries the database for the wallet, returning True if the wallet
    exists, and False otherwise.

    Args:
        db (`Session`): SQLAlchemy database session.
        user_id (`int`): The user's ID.
        currency (`str`): The currency of the wallet.

    Returns:
        `bool`: True if the wallet exists, False otherwise.
    """
    return db.query(Wallet).filter(
        Wallet.user_id == user_id,
        Wallet.currency == currency
    ).first() is not None


def validate_deposit(amount: Decimal):
    """
    Validate a deposit.

    Args:
        amount (`Decimal`): The amount to deposit.

    Raises:
        `HTTPException`:
            - `400`: If the amount is zero or negative.
    """
    if amount <= 0:
        raise HTTPException(400, "Amount must be positive")


def validate_withdrawal(wallet: Wallet, amount: Decimal):
    """
    Validate a withdrawal.

    Args:
        wallet (`Wallet`): The Wallet object.
        amount (`Decimal`): The amount to deposit.

    Raises:
        `HTTPException`:
            - `400`: If the amount is zero or negative.
            - `400`: If the wallet balance is zero.
            - `400`: If the amount is greater than the wallet balance.
    """
    if amount <= 0:
        raise HTTPException(400, "Amount must be positive")
    if wallet.balance == 0:
        raise HTTPException(400, "Wallet balance is zero")
    if amount > wallet.balance:
        raise HTTPException(400, f"Insufficient funds: {wallet.balance}")


def validate_delete(wallet: Wallet):
    """
    Validate deleting a wallet.

    Args:
        wallet (`Wallet`): The Wallet object.

    Raises:
        `HTTPException`:
            - `400`: If the amount is greater than zero.
    """
    if wallet.balance > 0:
        raise HTTPException(400, "Wallet has positive balance")


def commit_wallet(db: Session, wallet: Wallet):
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
        db.add(wallet)
        db.commit()
        db.refresh(wallet)
        return wallet
    except IntegrityError:
        db.rollback()
        raise HTTPException(400, "Database operation failed")
