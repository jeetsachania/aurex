from sqlalchemy.orm import Session

from app.models.wallet import Wallet
from app.models.currency import Currency


def get_additional_currencies(db: Session, user_id: int) -> list[Currency]:
    user_currency_subquery = (
        db.query(Wallet.currency)
        .filter(Wallet.user_id == user_id)
        .subquery()
    )

    return (
        db.query(Currency)
        .filter(
            Currency.is_active.is_(True),
            ~Currency.code.in_(user_currency_subquery),
        )
        .all()
    )
