from datetime import datetime, timedelta
from enum import Enum
from typing import Optional

from fastapi import status, Request, HTTPException
from jose import jwt, JWTError

from backend.config import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM

class TokenCheckResult:
    """
    Generate a check result for a token.

    Args:
        status_code (`fastapi.status`): HTTP status code.
        is_valid (`bool`): True if the result is valid, False otherwise.
        message (`str`): Descriptive message regarding the result.
        username (`str`): Username of the current user.
        payload (`dict[str, Any]`): Decoded JWT.
        expires_at (`datetime`): Token expiration.
    """
    def __init__(self, status_code, is_valid, message, username=None, payload=None, expires_at=None):
        self.status_code = status_code
        self.is_valid = is_valid
        self.message = message
        self.username = username
        self.payload = payload
        self.expires_at = expires_at

def create_token_check_result(status_code, is_valid, message, username=None, payload=None, expires_at=None):
    return TokenCheckResult(
        status_code=status_code,
        is_valid=is_valid,
        message=message,
        username=username,
        payload=payload,
        expires_at=expires_at
    )

def create_token(data: dict, expiry_minutes: int) -> str:
    """
    Create a token for an authenticated user.

    Generates a token with a secret key and an optional expiry.

    Args:
        data (`dict`): A dict holding token information.
        expires_delta (`int`): Expiry time in minutes.

    Returns:
        encoded_jwt (`jwt.encode`): The JWT.
    """
    if expiry_minutes:
        expire = datetime.now() + timedelta(minutes=expiry_minutes)

    to_encode = data.copy()
    to_encode.update({"username": data['username']})
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str) -> dict:
    """
    Decodes and validates a token.

    Args:
        token (`str`): The token string.

    Returns:
        dict: The payload of the decoded token if valid, otherwise None.
    """
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"JWT decoding failed: {str(e)}"
        )

def token_expired(payload: dict) -> bool:
    """
    Check if a token has expired.

    Args:
        payload (`dict`): The dictionary containing token-related data.

    Returns:
        bool: True if the token has expired, False otherwise.
    """
    if payload.get("exp") < datetime.now().timestamp():
        return True
    else:
        return False

def check_token_exists(request: Request) -> None:
    """
    Check if a token exists.

    Args:
        request (`Request`): The request object.
    """
    token = request.headers.get("Authorization")[7:]

    if not token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token not present"
        )

def check_field(payload: dict, field: str) -> None:
    """
    Check if `field` exists within `payload`.

    Args:
        payload (`dict`): The payload dictionary.
        field (`str`): The field to check for within the payload.
    """
    if field not in payload:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Field {field} missing from token"
        )

def check_expiry(request: Request) -> TokenCheckResult:
    """
    Check if a token has expired.

    Args:
        request (`Request`): The request object.

    Returns:
        TokenCheckResult (`TokenCheckResult`): The check result for the token.
    """
    check_token_exists(request)

    try:
        payload = request.headers.get("Authorization")[7:]
        decoded_payload = decode_token(payload)
        username = decoded_payload.get("username")

        check_field(decoded_payload, "username")
        check_field(decoded_payload, "exp")
        
        if not token_expired(decoded_payload):
            return create_token_check_result(
                status.HTTP_200_OK,
                True,
                "Token is valid",
                username,
                decoded_payload,
                decoded_payload.get("exp")
            )
        else:
            return create_token_check_result(
                status.HTTP_400_BAD_REQUEST,
                False,
                "Token expired",
                username
            )
    except JWTError as e:
        return create_token_check_result(
            status.HTTP_400_BAD_REQUEST,
            False,
            f"JWT decoding failed: {str(e)}"
        )
