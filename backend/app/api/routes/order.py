from decimal import Decimal
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user
from backend.app.crud.utils import commit, get, get_and_lock, get_all
from backend.app.db.database import get_db
from backend.app.models.asset import Asset
from backend.app.models.user import User
from backend.app.models.order import Order
from backend.app.models.wallet import Wallet
from backend.app.schemas.order import OrderCreate, OrderResponse


router = APIRouter()


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create(order: OrderCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Add a new order to the database

    Args:
        order (`OrderCreate`): Order payload in the OrderCreate schema
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Returns:
        `Order`: Order object
    """
    asset = get(db, Asset, symbol=order.asset)

    if not asset:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Asset '{order.asset}' not found"
        )

    wallet = get_and_lock(db, Wallet, user_id=user.id, currency=asset.currency)

    if not wallet:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{asset.currency} wallet required"
        )

    required_margin: Decimal = order.quantity * order.price

    if required_margin > wallet.balance:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient balance"
        )

    wallet.balance -= required_margin

    new_order = Order(
        user_id=user.id,
        asset_type=order.asset_type,
        asset=order.asset,
        quantity=order.quantity,
        price=order.price,
        order_type="BUY",
        order_status="PENDING",
    )

    return commit(db, new_order)


@router.get("/", response_model=List[OrderResponse], status_code=status.HTTP_200_OK)
def get_all_orders(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get all orders

    Args:
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Returns:
        orders (`list[Order]`): List of all Order objects
    """
    return get_all(db, Order)
