from decimal import Decimal

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.models.wallet import Wallet

def get(db: Session, user_id: int, currency: str) -> Wallet:
    wallet = db.query(Wallet).filter(
        Wallet.user_id == user_id,
        Wallet.currency == currency
    ).first()

    if not wallet:
        raise HTTPException(404, f"Wallet '{wallet}' does not exist")

    return wallet


def exists(db: Session, user_id: int, currency: str) -> bool:
    return db.query(Wallet).filter(
        Wallet.user_id == user_id,
        Wallet.currency == currency
    ).first() is not None


def validate_deposit(amount: Decimal):
    if amount <= 0:
        raise HTTPException(400, "Amount must be positive")


def validate_withdrawal(wallet: Wallet, amount: Decimal):
    if amount <= 0:
        raise HTTPException(400, "Amount must be positive")
    if wallet.balance == 0:
        raise HTTPException(400, "Wallet balance is zero")
    if amount > wallet.balance:
        raise HTTPException(400, f"Insufficient funds: {wallet.balance}")


def validate_delete(wallet: Wallet):
    if wallet.balance > 0:
        raise HTTPException(400, "Wallet has positive balance")


def commit_wallet(db: Session, wallet: Wallet):
    try:
        db.add(wallet)
        db.commit()
        db.refresh(wallet)
        return wallet
    except IntegrityError:
        db.rollback()
        raise HTTPException(400, "Database operation failed")
