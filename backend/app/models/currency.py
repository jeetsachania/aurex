from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy import CheckConstraint

from backend.app.db.database import Base


class Currency(Base):
    """
    Currency Model

    Attributes:
        id (`sqlalchemy.Serial`): Auto-incremented unique ID.
        type (`sqlalchemy.String`): Fiat or commodity currency.
        code (`sqlalchemy.String`): ISO currency code.
        name (`sqlalchemy.String`): Human-readable currency name.
        symbol (`sqlalchemy.String`): Currency symbol.
        decimals (`sqlalchemy.Integer`): Number of decimal places to use.
        is_active (`sqlalchemy.Boolean`): Currently usable.
    """
    __tablename__ = "currencies"

    # Enforce capitalisation for currency code at database level.
    __table_args__ = (
        CheckConstraint("code = UPPER(code)", name="currency_code_uppercase"),
    )

    id = Column(Integer, primary_key=True)
    type = Column(String, nullable=False, default="fiat")
    code = Column(String(3), nullable=False, unique=True, index=True)
    name = Column(String, nullable=False)
    symbol = Column(String, nullable=True)
    decimals = Column(Integer, nullable=False, default=2)
    is_active = Column(Boolean, nullable=False, default=True)
