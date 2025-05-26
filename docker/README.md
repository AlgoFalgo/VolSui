# Docker Setup Guide

## Overview
This document explains how to build and run VolumaSui using Docker containers.

## Prerequisites
- Docker installed (version 20.10.0 or higher)
- Docker Compose installed (version 2.0.0 or higher)
- Access to Sui RPC endpoint
- Valid Telegram bot token

## Docker Configuration

### Dockerfile
The main Dockerfile includes:
- Node.js 18 base image
- Required dependencies
- Application code
- Configuration setup

### Docker Compose
The `docker-compose.yml` file orchestrates:
- VolumaSui application service
- Redis for caching
- MongoDB for data persistence

## Building the Image
```bash
# Build the Docker image
docker build -t volumasui:latest .

# Build using Docker Compose
docker-compose build
Running the Container
bash
Copy code
# Run using Docker
docker run -d \
  --name volumasui \
  -p 3000:3000 \
  -e SUI_RPC_URL=your_rpc_url \
  -e BOT_TOKEN=your_bot_token \
  -e FEE_COLLECTOR_ADDRESS=your_fee_address \
  volumasui:latest

# Run using Docker Compose
docker-compose up -d
Environment Variables
Create a .env file with:

env
Copy code
SUI_RPC_URL=https://sui-mainnet-rpc.example.com
BOT_TOKEN=your_telegram_bot_token
FEE_COLLECTOR_ADDRESS=0xfee_wallet_address
TRADING_WALLET_ADDRESS=0xtrading_wallet_address
Container Management
bash
Copy code
# View logs
docker logs volumasui

# Stop container
docker stop volumasui

# Remove container
docker rm volumasui
Production Considerations
Use Docker secrets for sensitive data
Implement health checks
Set up container monitoring
Configure volume persistence
Use production-grade databases
