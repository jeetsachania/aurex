### Deployment

#### Table of Contents
1. [Local Deployment](#local-deployment)
2. [Remote Deployment](#remote-deployment)

#### Local Deployment

1. Clone the repository locally

2. Create a new virtual environment and activate it
    ```
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3. Install the required dependencies found in `/backend/requirements.txt`
    ```
    pip install -r aurex/backend/requirements.txt
    ```

4. Check that the backend runs
    ```
    cd /aurex
    uvicorn backend.app.main:app --reload
    ...
    INFO:     Waiting for application startup.
    INFO:     Application startup complete.
    ```

5. Setup the frontend
    ```
    cd frontend/
    npm install
    ```

6. Check that the frontend runs
    ```
    npm run dev
    
    > frontend@0.0.0 dev
    > vite

    VITE v7.2.2  ready in 241 ms

    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose
    ➜  press h + enter to show help
    ```

7. Visit `http://localhost:8000`

#### Remote Deployment

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

7. Setup NGINX proxy
    ```
    # /etc/nginx/sites-available/aurex

    server {
        listen 80;
        server_name _;

        root /home/<db-user>/aurex/frontend/dist;
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

9. Restart NGINX
    ```
    sudo systemctl restart nginx
    ```

10. Create a symlink
    ```
    sudo ln -s /etc/nginx/sites-available/aurex /etc/nginx/sites-enabled/
    ```
