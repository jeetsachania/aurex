from sqlalchemy import (
    BigInteger,
    Column,
    DateTime,
    ForeignKey,
    func,
    Integer,
    Numeric
)
from sqlalchemy.orm import relationship

from app.db.database import Base


class TradingData(Base):
    """
    TradingData Model

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
    __tablename__ = "trading_data"

    id = Column(Integer, primary_key=True)
    asset_id = Column(Integer, ForeignKey("assets.id", ondelete="CASCADE"), nullable=False, index=True)
    trading_date = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), index=True)
    open_price = Column(Numeric(precision=12, scale=2), nullable=False)
    close_price = Column(Numeric(precision=12, scale=2), nullable=False)
    high_price = Column(Numeric(precision=12, scale=2), nullable=False)
    low_price = Column(Numeric(precision=12, scale=2), nullable=False)
    volume = Column(BigInteger, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    asset = relationship("Asset", back_populates="trading_data")
