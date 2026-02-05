from pydantic import BaseModel, Field
from typing import Literal, Optional


class CurrencyCreate(BaseModel):
    """
    CurrencyCreate Schema.

    Attributes:
        type (`str`): Fiat or commodity currency.
        code (`str`): ISO currency code.
        name (`str`): Human-readable currency name.
        symbol (`str`): Currency symbol.
        decimals (`int`): Number of decimal places to use.
    """
    type: str
    code: str
    name: str
    symbol: str
    decimals: Optional[int] = Field(default=2, ge=0, le=10)


class CurrencyResponse(BaseModel):
    """
    CurrencyResponse Schema.

    Attributes:
        id (`int`): Auto-incremented unique ID.
        type (`str`): Fiat or commodity currency.
        code (`str`): ISO currency code.
        name (`str`): Human-readable currency name.
        symbol (`str`): Currency symbol.
        decimals (`int`): Number of decimal places to use.
        is_active (`bool`): Currently usable.
    """
    id: int
    type: Literal["fiat", "commodity"]
    code: str
    name: str
    symbol: Optional[str]
    decimals: int
    is_active: bool

    class Config:
        """
        Parse the SQLAlchemy ORM model into a Pydantic model.
        """
        orm_mode = True
