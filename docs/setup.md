# Setup
## Initial Project Directory Structure
1. Create initial project directory structure
    ```
    aurex/
    ├── backend/                # FastAPI backend
    ├── docker-compose.yml      # Docker orchestration
    ├── docs/                   # Project documentation
    ├── .env                    # Environment variables
    ├── .gitignore
    └── README.md
    ```

## Install Dependencies
```
pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary redis celery python-jose[cryptography] passlib[bcrypt] pytest
pip install python-dotenv alembic
```

## Update Backend Project Directory Structure
1. Create backend directory structure
    ```
    backend/
    ├── app/
    │   ├── __init__.py
    │   ├── main.py
    │   ├── api/
    │   │   ├── __init__.py
    │   │   ├── routes/
    │   │   │   ├── __init__.py
    │   │   │   └── users.py       # Example route
    │   ├── core/
    │   │   ├── __init__.py
    │   │   ├── config.py          # Settings & environment config
    │   ├── db/
    │   │   ├── __init__.py
    │   │   ├── database.py        # SQLAlchemy setup
    │   ├── models/
    │   │   ├── __init__.py
    │   │   └── user.py            # SQLAlchemy models
    │   ├── schemas/
    │   │   ├── __init__.py
    │   │   └── user.py            # Pydantic schemas
    │   ├── services/
    │   │   ├── __init__.py
    │   │   └── auth.py            # Authentication helpers
    │   ├── utils/
    │   │   ├── __init__.py
    │   │   └── helpers.py
    └── requirements.txt
    ```

## Update Frontend Project Directory Structure
1. Initialise frontend
    ```
    npm create vite@latest frontend -- --template react-ts
    ...
    │
    ◇  Use rolldown-vite (Experimental)?:
    │  No
    │
    ◇  Install with npm and start now?
    │  Yes
    ...
    ```
2. Start server
   ```
   npm run dev
   ```
3. Create additional folders
   ```
   api/
   assets/
   components/
   config/
   context/
   hooks/
   pages/
   routes/
   services/
   styles/
   utils/
   ```
4. Install dependencies
   ```
   npm install react-router-dom @tanstack/react-query axios chart.js react-chartjs-2
   npm install -D tailwindcss postcss autoprefixer
   ```
5. Initialise TailwindCSS
   ```
   npx tailwindcss init -p
   ```
