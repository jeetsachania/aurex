from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.crud.currency import get_additional_currencies
from app.crud.utils import commit, exists, get, get_all
from app.db.database import get_db
from app.models.user import User
from app.models.currency import Currency
from app.schemas.currency import CurrencyCreate, CurrencyResponse


router = APIRouter()


@router.post("/", response_model=CurrencyResponse, status_code=status.HTTP_200_OK)
def add(currency: CurrencyCreate, db: Session = Depends(get_db)):
    """
    Add a new currency to the database

    Args:
        currency (`CurrencyCreate`): Data used to create the new currency
        db (`Session`): SQLAlchemy database session

    Raises:
        `HTTPException`:
            - `400`: If the currency already exists

    Returns:
        `Currency`: The Currency object
    """
    # ADMIN ONLY
    if exists(db, Currency, code=currency.code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Currency '{currency.code}' already exists"
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
def get_all_currencies(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> List[Currency]:
    """
    Fetch all currencies

    Args:
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Raises:
        `HTTPException`:
            - `404`: If no currencies exist

    Returns:
        `list[Currency]`: List of all Currency objects
    """
    return get_all(db, Currency, message="No currencies found")


@router.get("/available", response_model=List[CurrencyResponse], status_code=status.HTTP_200_OK)
def get_available(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> List[Currency]:
    """
    Fetch all currencies

    Args:
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Returns:
        `list[Currency]`: List of all Currency objects
    """
    return get_additional_currencies(db, user.id)


@router.delete("/{code}", status_code=status.HTTP_204_NO_CONTENT)
def delete(code: str, db: Session = Depends(get_db)):
    # ADMIN ONLY
    currency = get(db, Currency, message=f"Currency '{code}' not found", code=code.upper())
    db.delete(currency)
    db.commit()
    return


@router.get("/{code}", response_model=CurrencyResponse, status_code=status.HTTP_200_OK)
def get_currency(code: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> List[Currency]:
    """
    Fetch a single currency

    Args:
        code (`str`): ISO currency code
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Raises:
        `HTTPException`:
            - `404`: If the currency does not exist

    Returns:
        `Currency`: The Currency object
    """
    return get(db, Currency, message=f"Currency '{code}' not found", code=code.upper())
