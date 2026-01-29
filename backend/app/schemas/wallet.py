from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel

class WalletResponse(BaseModel):
    """
    WalletResponse Schema.

    Attributes:
        id: (`int`): Auto-incremented unique ID.
        user_id: (`int`): User's ID.
        currency: (`str`): Wallet currency.
        balance: (`Decimal`): Wallet balance.
        created_at: (`datetime`): Wallet creation as datetime.
        updated_at: (`datetime`): Last update as datetime.
    """
    id: int
    user_id: int
    currency: str
    balance: Decimal
    created_at: datetime
    updated_at: datetime

    class Config:
        """
        Parse the SQLAlchemy ORM model into a Pydantic model.
        """
        orm_mode = True
