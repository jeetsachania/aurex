from typing import List

from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, role_required
from app.crud.utils import commit, exists, get, get_all
from app.db.database import get_db
from app.models.user import User
from app.models.asset import Asset
from app.models.trading_data import TradingData
from app.schemas.trading_data import TradingDataCreate, TradingDataResponse


router = APIRouter()


@router.post("/", status_code=status.HTTP_200_OK)
def create(data: TradingDataCreate, user: User = Depends(role_required("Admin")), db: Session = Depends(get_db)):
    """
    Add trading data to the database

    Args:
        data (`TradingDataCreate`): TradingData payload in the TradingData schema
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Returns:
        `TradingData`: The TradingData object
    """
    asset_id = get(db, Asset, message=f"Asset '{data.symbol}' not found", symbol=data.symbol)
    trading_data = TradingData(
        asset_id=asset_id.id,
        open_price=data.open_price,
        close_price=data.close_price,
        high_price=data.high_price,
        low_price=data.low_price,
        volume=data.volume
    )

    return commit(db, trading_data)


@router.get("/", response_model=List[TradingDataResponse], status_code=status.HTTP_200_OK)
def get_all(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get all trading data

    Args:
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Raises:
        `HTTPException`:
            - `404`: If no trading data exists

    Returns:
        orders (`list[TradingData]`): List of all TradingData objects
    """
    return get_all(db, TradingData, message="No trading data found")


@router.get("/{symbol}", status_code=status.HTTP_200_OK)
def get_by_symbol(symbol: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get trading data for the given symbol

    Args:
        symbol (`str`): Asset symbol
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Raises:
        `HTTPException`:
            - `404`: If the asset does not exist
            - `404`: If no trading data exists

    Returns:
        `dict`: The TradingData object
    """
    if not exists(db, Asset, symbol=symbol):
        raise HTTPException(
            status_code=404,
            detail=f"Asset '{symbol}' not found"
        )

    asset = get(db, Asset, message=f"Asset '{symbol}' not found", symbol=symbol)

    trading_data = (
        db.query(TradingData)
        .filter(TradingData.asset_id == asset.id)
        .order_by(TradingData.trading_date.desc())
        .first()
    )

    if trading_data is None:
        raise HTTPException(status_code=404, detail=f"Trading data not found for asset '{symbol}'")

    return {
        "symbol": symbol,
        "open_price": trading_data.open_price,
        "close_price": trading_data.close_price,
        "high_price": trading_data.high_price,
        "low_price": trading_data.low_price,
        "volume": trading_data.volume
    }
