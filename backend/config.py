from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_BASE_URL: str
    API_ROUTE_PREFIX: str
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = ".env"

settings = Settings()
