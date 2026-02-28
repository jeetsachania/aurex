from decimal import Decimal

from fastapi import HTTPException

from backend.app.models.wallet import Wallet


def validate_deposit(amount: Decimal):
    """
    Validate a deposit

    Args:
        amount (`Decimal`): The amount to deposit

    Raises:
        `HTTPException`:
            - `400`: If the amount is zero or negative
    """
    if amount <= 0:
        raise HTTPException(400, "Amount must be positive")


def validate_withdrawal(wallet: Wallet, amount: Decimal):
    """
    Validate a withdrawal.

    Args:
        wallet (`Wallet`): The Wallet object
        amount (`Decimal`): The amount to deposit

    Raises:
        `HTTPException`:
            - `400`: If the amount is zero or negative
            - `400`: If the wallet balance is zero
            - `400`: If the amount is greater than the wallet balance
    """
    if amount <= 0:
        raise HTTPException(400, "Amount must be positive")
    if wallet.balance == 0:
        raise HTTPException(400, "Wallet balance is zero")
    if amount > wallet.balance:
        raise HTTPException(400, f"Insufficient funds: {wallet.balance}")


def validate_delete(wallet: Wallet):
    """
    Validate deleting a wallet

    Args:
        wallet (`Wallet`): The Wallet object

    Raises:
        `HTTPException`:
            - `400`: If the amount is greater than zero
    """
    if wallet.balance > 0:
        raise HTTPException(400, "Wallet has positive balance")
