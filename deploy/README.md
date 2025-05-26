
# Deployment Guide

## Overview
This guide covers the deployment process for VolumaSui on various platforms.

## Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Access to Sui network
- Telegram bot token
- MongoDB instance
- Redis instance (optional)

## Environment Setup

### System Requirements
- 2 CPU cores minimum
- 4GB RAM minimum
- 20GB storage
- Ubuntu 20.04 or higher recommended

### Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2
Application Setup
1. Clone Repository
bash
Copy code
git clone https://github.com/algofalgo/volsui.git
cd volsui
2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment
Create .env file:

env
Copy code
SUI_RPC_URL=your_rpc_url
BOT_TOKEN=your_bot_token
FEE_COLLECTOR_ADDRESS=your_fee_address
TRADING_WALLET_ADDRESS=your_trading_address
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
4. Build Application
bash
Copy code
npm run build
Deployment Methods
PM2 Deployment
bash
Copy code
# Start application
pm2 start dist/index.js --name volumasui

# Enable startup script
pm2 startup
pm2 save
Systemd Service
Create service file /etc/systemd/system/volumasui.service:

ini
Copy code
[Unit]
Description=VolumaSui Trading Bot
After=network.target

[Service]
Type=simple
User=volumasui
WorkingDirectory=/opt/volumasui
ExecStart=/usr/bin/node dist/index.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
Enable and start service:

bash
Copy code
sudo systemctl enable volumasui
sudo systemctl start volumasui
Monitoring
Log Management
bash
Copy code
# PM2 logs
pm2 logs volumasui

# Systemd logs
journalctl -u volumasui
Health Checks
Monitor API endpoint: /health
Check Telegram bot status
Verify blockchain connectivity
Backup Strategy
Database backups
Configuration backups
Transaction logs
Security Considerations
Use SSL/TLS
Configure firewalls
Regular updates
Secure key storage
Rate limiting