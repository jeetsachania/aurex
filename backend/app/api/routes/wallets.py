from decimal import Decimal
from typing import List

from fastapi import APIRouter, Body, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.crud.wallet import get, exists, validate_deposit, validate_withdrawal, validate_delete, commit_wallet, get_all
from app.db.database import get_db
from app.models.user import User
from app.models.wallet import Wallet
from app.schemas.wallet import WalletResponse

router = APIRouter()

@router.post("/", response_model=WalletResponse, status_code=status.HTTP_201_CREATED)
def create(currency: str = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Create a wallet.

    Args:
        currency (`str`): The currency of the new wallet.
        user (`User`): The current user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        `Wallet`: The Wallet object.

    Raises:
        `HTTPException`:
            - `400`: If the wallet already exists.
            - `400`: If the database operation fails.
    """
    if exists(db, user.id, currency):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Wallet already exists"
        )

    wallet = Wallet(user_id=user.id, currency=currency, balance=0)
    return commit_wallet(db, wallet)


@router.post("/{currency}/deposit", response_model=WalletResponse, status_code=status.HTTP_200_OK)
def deposit(currency: str, amount: Decimal = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Deposit funds into a wallet.

    Deposits funds into a wallet, validating the amount to deposit
    and raising an appropriate exception if the deposit is not permitted.

    Args:
        currency (`str`): The currency of the wallet.
        amount (`Decimal`): The amount to deposit.
        user (`User`): The current user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        `Wallet`: The Wallet object.

    Raises:
        `HTTPException`:
            - `400`: If the amount is zero or negative.
            - `400`: If the database operation fails.
    """
    wallet = get(db, user_id=user.id, currency=currency)
    validate_deposit(amount)
    wallet.balance += amount
    return commit_wallet(db, wallet)


@router.post("/{currency}/withdraw", response_model=WalletResponse, status_code=status.HTTP_200_OK)
def withdraw(currency: str, amount: Decimal = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Withdraw funds from a wallet.

    Withdraws funds from a wallet, validating the amount to withdraw and
    raising an appropriate exception if the withdrawal is not permitted.

    Args:
        currency (`str`): The currency of the wallet.
        amount (`Decimal`): The amount to withdraw.
        user (`User`): The current user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        `Wallet`: The Wallet object.

    Raises:
        `HTTPException`:
            - `400`: If the amount is zero or negative.
            - `400`: If the wallet balance is zero.
            - `400`: If the amount to withdraw is greater than the wallet balance.
            - `400`: If the database operation fails.
    """
    wallet = get(db, user_id=user.id, currency=currency)
    validate_withdrawal(wallet, amount)
    wallet.balance -= amount
    return commit_wallet(db, wallet)


@router.delete("/{currency}", status_code=status.HTTP_204_NO_CONTENT)
def delete(currency: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Delete a wallet.

    Removes the wallet with the given currency associated with the current user.
    If the wallet does not exist or has a balance greater than zero,
    an exception is raised, else the wallet is removed.

    Args:
        currency (`str`): The currency of the wallet.
        user (`User`): The current user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        None: Returns `HTTP_204_NO_CONTENT` on successful deletion.

    Raises:
        `HTTPException`:
            - `400`: If the wallet balance is greater than zero.
            - `400`: If the database operation fails.
    """
    wallet = get(db, user_id=user.id, currency=currency)
    validate_delete(wallet)
    db.delete(wallet)
    db.commit()
    return


@router.get("/list", response_model=List[WalletResponse], status_code=status.HTTP_200_OK)
def get_wallets(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Fetches all wallets for the given user.

    Args:
        user (`User`): The current user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        `sqlalchemy.sql.expression.ColumnElement`: All wallets for the given user.
    """
    return get_all(db, user.id)
