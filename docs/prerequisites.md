### Prerequisites

#### Table of Contents
1. [Environment Files](#environment-files)
2. [PostgreSQL](#postgresql)
3. [SSH Keys](#ssh-keys)

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

#### PostgreSQL - **TODO**

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
