from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    ForeignKey,
    func,
    Integer,
    Numeric,
    String
)
from sqlalchemy.orm import relationship

from backend.app.db.database import Base


order_status_enum = Enum(
    "PENDING",
    "CANCELLED",
    "FILLED",
    "EXPIRED",
    name="order_status"
)

order_type_enum = Enum(
    "BUY",
    "SELL",
    name="order_type"
)

asset_type_enum = Enum(
    "COMMODITY",
    "STOCK",
    name="asset_type"
)


class Order(Base):
    """
    Order Model

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
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    asset_type = Column(asset_type_enum, nullable=False)
    asset = Column(String, nullable=False)
    order_type = Column(order_type_enum, nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Numeric(precision=12, scale=2), nullable=False)
    order_status = Column(order_status_enum, nullable=False, server_default="PENDING", index=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), index=True)
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="orders")
