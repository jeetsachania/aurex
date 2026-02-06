from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.crud.currency import get_all_currencies, exists, get_additional_currencies
from app.crud.utils import commit
from app.db.database import get_db
from app.models.user import User
from app.models.currency import Currency
from app.schemas.currency import CurrencyCreate, CurrencyResponse


router = APIRouter()


@router.post("/", response_model=CurrencyResponse, status_code=status.HTTP_200_OK)
def add(currency: CurrencyCreate, db: Session = Depends(get_db)):
    """
    Add a new currency to the database.

    Args:
        type (`str`): Fiat or commodity currency.
        code (`str`): ISO currency code.
        name (`str`): Human-readable currency name.
        symbol (`str`): Currency symbol.
        decimals (`int`): Number of decimal places to use.
        db (`Session`): SQLAlchemy database session.
    """
    # ADMIN ONLY
    if exists(db, currency.code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Currency already exists"
        )

    new_currency = Currency(
        type=currency.type,
        code=currency.code,
        name=currency.name,
        symbol=currency.symbol,
        decimals=currency.decimals
    )
    return commit(db, new_currency)


@router.get("/all", response_model=List[CurrencyResponse], status_code=status.HTTP_200_OK)
def get_all(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> List[Currency]:
    """
    Fetch all currencies.

    Args:
        user (`User`): The current user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        `list[Currency]`: List of all currency objects.
    """
    return get_all_currencies(db)


@router.get("/available", response_model=List[CurrencyResponse], status_code=status.HTTP_200_OK)
def get_available(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> List[Currency]:
    """
    Fetch all currencies.

    Args:
        user (`User`): The current user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        `list[Currency]`: List of all currency objects.
    """
    return get_additional_currencies(db, user.id)


@router.delete("/{code}", status_code=status.HTTP_204_NO_CONTENT)
def delete(code: str, db: Session = Depends(get_db)):
    # ADMIN ONLY
    if not exists(db, code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Currency does not exist"
        )

    currency = db.query(Currency).filter(Currency.code == code.upper()).first()
    db.delete(currency)
    db.commit()
    return


@router.get("/{code}", response_model=CurrencyResponse, status_code=status.HTTP_200_OK)
def get_currency(code: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> List[Currency]:
    """
    Fetch a single currency.

    Args:
        code (`str`): ISO currency code.
        user (`User`): The current user.
        db (`Session`): SQLAlchemy database session.

    Returns:
        `Currency`: Currency object.
    """
    currency = db.query(Currency).filter(Currency.code == code.upper()).first()
    if not currency:
        raise HTTPException(status_code=404, detail="Currency not found")
    return currency
