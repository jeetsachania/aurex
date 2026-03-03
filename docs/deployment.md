### Deployment

#### Table of Contents
1. [Local Deployment](#local-deployment)
    1. [Docker](#docker)
2. [Remote Deployment](#remote-deployment)
    1. [Azure](#azure)

## Local Deployment

### Docker

1. Ensure you have Docker installed and running locally
    1. Confirm Docker is installed
        ```
        docker -v
        Docker version <version>, build <build>
        ```

    2. Confirm that Docker is running
        ```
        docker info
        Client:
            Version:    <version>
            Context:    desktop-linux
            ...
        ```

2. Clone the repository locally

3. Setup the [environment files](prerequisites.md#environment-files)

4. Navigate to the project's root directory via terminal and build the app
    1. Create and start the Postgres container
        ```
        docker-compose up -d db
        ```

    2. Create and start the `backend` and `web` containers
        ```
        docker-compose up -d backend web
        ```
    3. Optionally, if you have a `dump` file for the database
        ```
        docker exec -i <db-container-name> pg_restore -U dev -d aurex <dump>.dump
        ```

The backend should now be running on `http://localhost:8000/` with the frontend at `http://localhost/`

## Remote Deployment

### Azure

1. Clone the repository to the VM

2. Create a new virtual environment and activate it
    ```
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3. Install the required dependencies found in `/backend/requirements.txt`
    ```
    pip install -r aurex/backend/requirements.txt
    ```

4. Setup the `systemd` service to run FastAPI in the background
    ```
    # /etc/systemd/system/aurex.service

    [Unit]
    Description=FastAPI app
    After=network.target

    [Service]
    User=<vm-user>
    Group=www-data
    WorkingDirectory=/home/<vm-user>/aurex
    Environment="DATABASE_URL=postgresql://<db-user>:<db-password>@localhost:5432/aurex"
    ExecStart=/home/<db-user>/.venv/bin/gunicorn main:app -w 2 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000

    [Install]
    WantedBy=multi-user.target
    ```

5. Test that the backend runs
    ```
    uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
    ```

6. Install frontend depdendencies
    ```
    cd frontend/
    npm install
    ```

7. Setup Nginx proxy
    ```
    # /etc/nginx/sites-available/aurex

    server {
        listen 80;
        server_name _;

        root /home/<vm-user>/aurex/frontend/dist;
        index index.html;

        location / {
            try_files $uri /index.html;
        }

        location /api/ {
            proxy_pass http://127.0.0.1:8000/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```

8. Check changes
    ```
    sudo nginx -t
    ```

9. Restart Nginx
    ```
    sudo systemctl restart nginx
    ```

10. Create a symlink
    ```
    sudo ln -s /etc/nginx/sites-available/aurex /etc/nginx/sites-enabled/
    ```
