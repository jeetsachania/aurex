from datetime import datetime

from enum import Enum
from datetime import datetime
from pydantic import BaseModel


class AssetType(str, Enum):
    COMMODITY = "COMMODITY"
    STOCK = "STOCK"


class AssetStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"


class TradingDataCreate(BaseModel):
    """
    TradingDataCreate Schema

    Attributes:
        symbol (`str`): Asset symbol
        name (`str`): Asset name
        asset_type (`str`): Type of asset
        exchange (`str`): Exchange
        currency (`str`): Trading currency
    """
    symbol: str
    name: str
    asset_type: str
    exchange: str
    currency: str


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
    open_price: int
    close_price: int
    high_price: int
    low_price: int
    volume: int
    created_at: datetime
    updated_at: datetime

    class Config:
        """
        Parse the SQLAlchemy ORM model into a Pydantic model
        """
        orm_mode = True
