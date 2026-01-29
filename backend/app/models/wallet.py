from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    func,
    Integer,
    Numeric,
    String,
    UniqueConstraint
)
from sqlalchemy.orm import relationship

from app.db.database import Base


class Wallet(Base):
    """
    Wallet Model

    Attributes:
        id (`int`): Auto-incremented unique ID.
        user_id (): User ID.
        currency (): Wallet currency.
        balance (): Wallet balance.
        created_at (): Date created.
        updated_at (): Date modified.
    """
    __tablename__ = "wallets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    currency = Column(String(10), nullable=False)
    balance = Column(Numeric(18, 2), nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="wallets")

    __table_args__ = (
        UniqueConstraint("user_id", "currency", name="uq_user_currency_wallet"),
    )
