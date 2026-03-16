provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "project_rg" {
  name     = var.rg_name
  location = var.location

  tags = {
    project = var.project_tag
    owner   = var.owner_tag
    env     = var.env_tag
  }
}

# Virtual Network
resource "azurerm_virtual_network" "project_vnet" {
  name                = var.vnet_name
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.project_rg.location
  resource_group_name = azurerm_resource_group.project_rg.name
}

# Subnet
resource "azurerm_subnet" "project_subnet" {
  name                 = var.subnet_name
  resource_group_name  = azurerm_resource_group.project_rg.name
  virtual_network_name = azurerm_virtual_network.project_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Network Interface
resource "azurerm_network_interface" "project_network_interface" {
  name                = var.nic_name
  location            = azurerm_resource_group.project_rg.location
  resource_group_name = azurerm_resource_group.project_rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.project_subnet.id
    private_ip_address_allocation = "Dynamic"
  }
}

# Linux VM
resource "azurerm_linux_virtual_machine" "project_vm" {
  name                = var.vm_name
  resource_group_name = azurerm_resource_group.project_rg.name
  location            = azurerm_resource_group.project_rg.location
  size                = var.vm_size
  admin_username      = var.admin_username
  network_interface_ids = [
    azurerm_network_interface.project_network_interface.id,
  ]

  custom_data = filebase64("${path.module}/cloud-init.yml")

  admin_ssh_key {
    username   = var.admin_username
    public_key = file(var.terraform_ssh_key_path)
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuPro"
    sku       = "22.04-lts"
    version   = "latest"
  }
}