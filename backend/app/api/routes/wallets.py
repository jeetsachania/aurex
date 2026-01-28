from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.models.wallet import Wallet

router = APIRouter()

@router.post("/exists")
def wallet_exists(currency: str = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    wallet = db.query(Wallet).filter(Wallet.currency == currency, Wallet.user_id == user.id).first()
    return {"exists": wallet is not None}
