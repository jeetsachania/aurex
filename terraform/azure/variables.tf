variable "terraform_ssh_key_path" {
  description = "Path to Terraform SSH key"
  type        = string
}

variable "rg_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "aurex-resource-group"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "France Central"
}

variable "vnet_name" {
  description = "Name of the Virtual Network"
  type        = string
  default     = "tf-vnet"
}

variable "subnet_name" {
  description = "Name of the Subnet"
  type        = string
  default     = "tf-subnet"
}

variable "nic_name" {
  description = "Name of the Network Interface"
  type        = string
  default     = "tf-nic"
}

variable "vm_size" {
  description = "Size of the VM"
  type        = string
  default     = "Standard_B2ts_v2"
}

variable "vm_name" {
  description = "Name of the Linux VM"
  type        = string
  default     = "tf-vm"
}

variable "admin_username" {
  description = "VM admin username"
  type        = string
  default     = "azureuser"
}

variable "project_tag" {
  description = "Project tag"
  type        = string
  default     = "aurex"
}

variable "owner_tag" {
  description = "Owner tag"
  type        = string
  default     = "me"
}

variable "env_tag" {
  description = "Environment tag"
  type        = string
  default     = "dev"
}