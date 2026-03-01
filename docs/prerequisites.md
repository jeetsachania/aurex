### Prerequisites

#### Table of Contents
1. [Environment Files](#environment-files)
2. [PostgreSQL](#postgresql)
3. [SSH Keys](#ssh-keys)

#### Initial Setup

1. Clone the repository to the VM
2. Create a new virtual environment and activate it
    ```
    python3 -m venv .venv
    source .venv/bin/activate
    ```
3. Install the required dependencies as found in `/backend/requirements.txt`
    ```
    pip install -r aurex/backend/requirements.txt
    ```
4. Setup the systemd service to run FastAPI in the background
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
6. Setup the frontend
    ```
    cd frontend/
    npm install
    ```

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
7. Check changes
    ```
    sudo nginx -t
    ```
8. Restart NGINX
    ```
    sudo systemctl restart nginx
    ```
9. Create a symlink
    ```
    sudo ln -s /etc/nginx/sites-available/aurex /etc/nginx/sites-enabled/
    ```

#### Environment Files
##### Backend
```
# /aurex/.env

API_BASE_URL=http://localhost:8000
API_ROUTE_PREFIX=/api
DATABASE_URL=postgresql://<user>:<password>@localhost/aurex
SECRET_KEY=supersecretkey
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_MINUTES=60
```

| Variable                | Development                                       | Production                                              |
|-------------------------|---------------------------------------------------|---------------------------------------------------------|
| `API_BASE_URL`          | `http://localhost:8000`                           | `http://localhost:8000`                                 |
| `API_ROUTE_PREFIX`      | `/api`                                            | `none`                                                  |
| `DATABASE_URL`          | `postgresql://<user>:<password>@localhost/aurex`  | `postgresql://<user>:<password>@<vm-ip-address>/aurex`  |

##### Frontend
```
# /aurex/frontend/.env

VITE_API_BASE_URL=http://localhost:8000
```

| Variable                     | Development                                       | Production                                              |
|------------------------------|---------------------------------------------------|---------------------------------------------------------|
| `VITE_API_BASE_URL`          | `http://localhost:8000`                           | `http://<vm-ip-address>:8000`                           |

#### PostgreSQL
1. List steps to create a new database locally

#### SSH Keys

Generate and store an SSH key on the VM to use with GitHub to allow cloning and updating the local repo.

1. Generate an SSH key for GitHub
    ```
    <user@vm>:~$ /ssh-keygen -t rsa -b 4096 -C "azure_vm" -f ~/.ssh/<key>
    ```
2. Add this key to GitHub
3. Confirm that the key works via the VM CLI
    ```
    <user@vm>:~$ ssh -T git@github.com -i ~/.ssh/<key>
    Hi <github-username>! You've successfully authenticated, but GitHub does not provide shell access.
    ```
4. Add identity to the authentication agent running on the VM
    ```
    <user@vm>:~$ eval "$(ssh-agent -s)"
    <user@vm>:~$ ssh-add ~/.ssh/<key>
    <user@vm>:~$ ssh -T git@github.com
    ```
