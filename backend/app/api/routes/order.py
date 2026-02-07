from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.crud.currency import get_all_currencies, exists, get_additional_currencies
from app.crud.utils import commit
from app.db.database import get_db
from app.models.user import User
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderResponse


router = APIRouter()


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_200_OK)
def create(order: OrderCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    
    """
    new_order = Order(
        user_id=user.id,
        asset_type=order.asset_type,
        asset=order.asset,
        quantity=order.quantity,
        price=order.price,
        order_type="BUY",
        order_status="PENDING"
    )

    return commit(db, new_order)
