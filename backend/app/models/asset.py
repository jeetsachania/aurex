from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    func,
    Integer,
    String
)
from sqlalchemy.orm import relationship

from backend.app.db.database import Base


asset_type_enum = Enum(
    "COMMODITY",
    "STOCK",
    name="asset_type",
    create_type=False
)


class Asset(Base):
    """
    Asset Model

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
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True)
    symbol = Column(String, nullable=False, unique=True, index=True) # AAPL
    name = Column(String, nullable=False) # Apple
    asset_type = Column(asset_type_enum, nullable=False) # Stock or commodity
    exchange = Column(String, nullable=False, index=True) # NASDAQ, COMEX
    currency = Column(String, nullable=False) # USD, GBP
    active = Column(Boolean, nullable=False, default=True) # Active or inactive asset
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    trading_data = relationship("TradingData", back_populates="asset", cascade="all, delete-orphan")
