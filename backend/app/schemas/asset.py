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


class AssetCreate(BaseModel):
    """
    AssetCreate Schema

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


class AssetResponse(BaseModel):
    """
    AssetResponse Schema

    Attributes:
        id (`int`): Auto-incremented unique ID
        symbol (`str`): Asset symbol
        name (`str`): Asset name
        asset_type (`str`): Type of asset
        exchange (`str`): Exchange
        currency (`str`): Trading currency
        active (`str`): Asset trading status
        created_at (`Datetime`): Date created
        updated_at (`Datetime`): Date modified
    """
    id: int
    symbol: str
    name: str
    asset_type: AssetType
    exchange: str
    currency: str
    active: AssetStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        """
        Parse the SQLAlchemy ORM model into a Pydantic model
        """
        orm_mode = True
