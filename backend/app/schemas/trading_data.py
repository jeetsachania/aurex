from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel


class TradingDataCreate(BaseModel):
    """
    TradingDataCreate Schema

    Attributes:
        symbol (`str`): Asset symbol
        open_price (`Decimal`): Open price
        close_price (`Decimal`): Close price
        high_price (`Decimal`): Highest price
        low_price (`Decimal`): Lowest price
        volume (`Decimal`): Trading volume
    """
    symbol: str
    open_price: Decimal
    close_price: Decimal
    high_price: Decimal
    low_price: Decimal
    volume: Decimal


class TradingDataResponse(BaseModel):
    """
    TradingDataResponse Schema

    Attributes:
        id (`int`): Auto-incremented unique ID
        asset_id (`int`): Asset ID
        trading_date (`Datetime`): Trading data date
        open_price (`int`): Price at open
        close_price (`int`): Price at close
        high_price (`int`): Highest price for the current date
        low_price (`int`): Lowest price for the current date
        volume (`int`): Trading volume
        created_at (`Datetime`): Date created
        updated_at (`Datetime`): Date modified
    """
    id: int
    asset_id: int
    trading_date: datetime
    open_price: Decimal
    close_price: Decimal
    high_price: Decimal
    low_price: Decimal
    volume: Decimal
    created_at: datetime
    updated_at: datetime

    class Config:
        """
        Parse the SQLAlchemy ORM model into a Pydantic model
        """
        orm_mode = True
