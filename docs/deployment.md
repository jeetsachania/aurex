### Deployment

#### Table of Contents
1. [Local Deployment](#local-deployment)
    1. [Docker](#docker)
2. [Remote Deployment](#remote-deployment)
    1. [Terraform](#terraform)
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

4. Navigate to the project's root directory via a terminal and build the app using Docker
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

### Terraform

#### Azure

##### Initial Setup

1. Generate a Terraform SSH key
    ```
    ssh-keygen -t rsa -b 4096 -f <path-to-key>/<key-name> -N " "
    ```

2. Set the SSH key as an environment variable
    ```
    TF_VAR_terraform_ssh_key_path=<ssh-key>.pub
    ```

3. Set the `Subscription ID` and `Tenant ID` as environment variables using the `setup.sh` script
    - **Note:** This will ask you to login to Azure
        ```
        source setup.sh
        ```

##### Deployment

1. Adjust the variable names in `/terraform/azure/variables.tf`

2. Initialise Terraform
    ```
    cd aurex/terraform/azure
    terraform init
    ```

3. Optionally validate the Terraform files
    ```
    terraform validate
    ```

4. Optionally generate an Execution Plan
    ```
    terraform plan

    Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following

    symbols:
        + create

    Terraform will perform the following actions:

    # azurerm_linux_virtual_machine.project_vm will be created
        + resource "azurerm_linux_virtual_machine" "project_vm" {
            + admin_username                                         = "azureuser"
        ...
    ```

4. Apply the Terraform configuration to provision Azure resources
    ```
    terraform apply
    ```

5. Verify deployment
    ```
    az group show --name <rg-name>
    az vm list --resource-group <rg-name> -o table
    ```

6. Optionally destroy infrastructure
    ```
    terraform destroy
    ```
