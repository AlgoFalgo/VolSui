# Architecture

## System Overview

VolumaSui includes:

1. **Telegram Bot (Telegraf.js)**  
   - Accepts `/push_volume` commands  
   - Forkable via `/fork_bot`  
   - Replies with transaction status

2. **Volume Engine (Sui SDK + TradeService)**  
   - Routes trades via DeepBook or Cetus  
   - Injects 0.3% fee to deployer's wallet  
   - Logs TX results

3. **Wallet Monitor**  
   - Listens for deposits  
   - Auto-triggers volume push  

4. **Web Dashboard (React + Express)**  
   - Strategy selection UI  
   - `/strategy/execute` endpoint  
   - TX history and fee analytics

## Modular Design

- Commands → Handlers → Services → TX logic
- Configurable per-deployer fork
- Compatible with both wallet and Telegram triggers

