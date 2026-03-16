#!/bin/bash

echo "Logging into Azure..."
az login

echo "Fetching subscription details..."

export ARM_SUBSCRIPTION_ID=$(az account show --query id -o tsv)
export ARM_TENANT_ID=$(az account show --query tenantId -o tsv)

echo "Environment variables set!"
echo "You can now run Terraform commands."