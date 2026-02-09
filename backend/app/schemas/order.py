from datetime import datetime

from enum import Enum
from datetime import datetime
from pydantic import BaseModel


class AssetType(str, Enum):
    COMMODITY = "COMMODITY"
    STOCK = "STOCK"


class OrderStatus(str, Enum):
    PENDING = "PENDING"
    CANCELLED = "CANCELLED"
    FILLED = "FILLED"
    EXPIRED = "EXPIRED"


class OrderType(str, Enum):
    BUY = "BUY"
    SELL = "SELL"


class OrderCreate(BaseModel):
    """
    OrderCreate Schema

    Attributes:
        asset_type (`str`): Type of asset
        asset (`str`): Asset name
        quantity (`int`): Quantity to buy or sell
        price (`int`): Price to buy or sell asset at
    """
    asset_type: str
    asset: str
    quantity: int
    price: int


class OrderResponse(BaseModel):
    """
    OrderResponse Schema

    Attributes:
        id (`int`): Auto-incremented unique ID
        user_id (`int`): User ID
        asset_type (`str`): Type of asset
        asset (`str`): Asset name
        order_type (`str`): Trade type
        quantity (`int`): Quantity
        price (`int`): Price
        order_status (`str`): Trade status
        created_at (`Datetime`): Date created
        updated_at (`Datetime`): Date modified
    """
    id: int
    user_id: int
    asset_type: AssetType
    asset: str
    order_type: OrderType
    quantity: int
    price: int
    order_status: OrderStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        """
        Parse the SQLAlchemy ORM model into a Pydantic model
        """
        orm_mode = True
