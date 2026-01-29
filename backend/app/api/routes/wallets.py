from decimal import Decimal

from fastapi import APIRouter, Body, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.crud.wallet import get, exists, validate_deposit, validate_withdrawal, validate_delete, commit_wallet
from app.db.database import get_db
from app.models.user import User
from app.models.wallet import Wallet
from app.schemas.wallet import WalletResponse

router = APIRouter()

@router.post("/", response_model=WalletResponse, status_code=status.HTTP_201_CREATED)
def create(currency: str = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if exists(db, user.id, currency):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Wallet already exists"
        )

    wallet = Wallet(user_id=user.id, currency=currency, balance=0)
    return commit_wallet(db, wallet)


@router.post("/{currency}/deposit", response_model=WalletResponse, status_code=status.HTTP_200_OK)
def deposit(currency: str, amount: Decimal = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    wallet = get(db, user_id=user.id, currency=currency)
    validate_deposit(amount)
    wallet.balance += amount
    return commit_wallet(db, wallet)


@router.post("/{currency}/withdraw", response_model=WalletResponse, status_code=status.HTTP_200_OK)
def withdraw(currency: str, amount: Decimal = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    wallet = get(db, user_id=user.id, currency=currency)
    validate_withdrawal(wallet, amount)
    wallet.balance -= amount
    return commit_wallet(db, wallet)


@router.delete("/{currency}", status_code=status.HTTP_204_NO_CONTENT)
def delete(currency: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    wallet = get(db, user_id=user.id, currency=currency)
    validate_delete(wallet)
    db.delete(wallet)
    db.commit()
    return
