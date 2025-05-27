# 📊 VolumaSui — Telegram-Native Smart Volume™ Engine for the Sui Blockchain

**VolumaSui** is a modular, on-chain trading orchestration framework that enables synthetic volume ignition on Sui through a Telegram-native interface. It simulates authentic trade activity using real DEX execution and relay-based fee routing.

> Ideal for token projects, ecosystem grant applicants, or meme launches looking to boost visibility through auditable, economically rational on-chain behavior.

## 🧠 Concept Overview

VolumaSui provides:

- ✅ Permissionless volume execution via `/push_volume` or wallet deposit  
- ✅ On-chain routing through DeepBook or Cetus  
- ✅ Risk management (drawdown limits, volume caps, TX throttling)  
- ✅ Configurable relay fee (% of trade)  
- ✅ Strategy execution API for programmatic trading  
- ✅ Transparent TX logging and analytics  

It introduces a **programmable attention engine**, not a price oracle.  
Every volume push is a real, signed Sui transaction that changes token and LP state on-chain.

## 📊 Trade Execution Model

Let:

- A = Total input amount (in SUI or token)  
- f = Relay fee rate (default = 0.003 → 0.3%)  
- T = Tradeable amount → T = A * (1 - f)  
- F = Fee amount → F = A * f  

VolumaSui transforms input into two linked transfers:

1. Transfer(F) → relay wallet (e.g., deployer or protocol)  
2. Swap(T)     → through DeepBook or Cetus pool  

These actions are executed atomically in a Sui transaction block — no spoofing, no off-chain custody.

## ⚙️ Architecture

Telegram Bot (Telegraf.js)  
├── /push_volume → VolumeHandler → TradeService  
└── /fork_bot    → ForkHandler    → Bot registry  

Core Services  
├── RiskManager       → drawdown, volume, TX limits  
├── TradeService      → Sui TX execution  
├── StrategyLogger    → analytics + logs  
└── WalletMonitor     → watches deposits  

API Layer (Fastify)  
├── POST /strategy/execute  
├── GET /analytics/:vaultId  
└── GET /txlog?wallet=0xabc...

## 🔧 Features

| Feature            | Description                                                  |
|--------------------|--------------------------------------------------------------|
| **Risk Management** | Drawdown (<10%), 24h volume (<1000 SUI), failed TXs (<3)    |
| **Strategy Engine** | Configurable trading strategies via API                     |
| **/push_volume**    | Executes on-chain volume with relay fee                     |
| **/fork_bot**       | Deploys branded forkable Telegram bots                      |
| **WalletMonitor**   | Auto-executes trades on deposit                             |
| **Analytics API**   | Track performance, view strategy history                    |

## 📊 Why Smart Volume™ Matters

> Attention drives adoption.  
> Most price action follows volume, not valuation.

DEX charts, aggregators, and token alert systems surface tokens with **high trade activity**.

VolumaSui lets you trigger visibility **on-chain**, through real volume — from chat or wallet.

🚫 This is not spoofing.  
✅ This is on-chain attention engineering.

## 📁 Folder Structure

volumasui/  
├── src/  
│   ├── index.ts              # Entry point  
│   ├── config/env.ts         # .env loader  
│   ├── handlers/  
│   │   ├── volumeHandler.ts  # Telegram volume execution  
│   │   └── forkHandler.ts    # Bot factory  
│   ├── services/  
│   │   ├── RiskManager.ts    # Limits + protection  
│   │   ├── TradeService.ts   # TX execution logic  
│   │   └── StrategyLogger.ts # TX + strategy logging  
│   ├── api/  
│   │   ├── strategyRoutes.ts   # POST /strategy/execute  
│   │   ├── analyticsRoutes.ts  # GET /analytics  
│   │   └── txlog.ts            # Wallet logs  
├── docs/  
│   ├── api_reference.md  
│   └── architecture.md  
└── package.json

## 🚀 Quick Start

1. Clone the repo:  
   `git clone https://github.com/YOUR_USERNAME/volumasui`  
   `cd volumasui`  
   `npm install`  

2. Create a `.env` file:

BOT_TOKEN=your_telegram_token  
SUI_RPC_URL=https://sui-mainnet-endpoint  
FEE_COLLECTOR_ADDRESS=0xyourwallet  
TRADING_WALLET_ADDRESS=0xbotwallet  
RISK_MANAGER_CONFIG={"maxDrawdown": 0.1, "maxVolume": 1000}

3. Start the system:  
   `npm run dev`

## 📡 API Usage

### POST /strategy/execute  
Execute a strategy with:

{  
  "amount": "5.0",  
  "token": "0xabc...",  
  "lp": "cetus",  
  "strategy": "one_shot",  
  "deployerId": "telegram_user_123"  
}

### GET /analytics/:vaultId  
Returns historical performance and PnL for a vault.

### GET /txlog?wallet=0xabc123...  
Returns all trades triggered by the wallet.

## 🧠 Security & Auditability

- RiskManager enforces configurable limits  
- Only executes real on-chain trades (no off-chain spoofing)  
- TXs are logged and publicly queryable  
- Modular, testable service logic  

## 💼 Use Cases

| User Type         | Utility                                                  |
|------------------|-----------------------------------------------------------|
| Token Creator     | Push early volume to catalyze visibility                 |
| Telegram Operator | Monetize forks or Smart Volume™ delivery                |
| Launchpad/DeFi UI | Embed bot-as-a-service via SDK                           |
| Grant Applicant   | Prove traction through logged, auditable execution       |

## 📟 License

**MIT** — fork it, run it, improve it. Credit helps visibility.

## ✅ TL;DR

VolumaSui gives Sui token teams **programmable visibility** and **risk-managed execution**, straight from Telegram or wallet activity.

> Fork it. Push volume. Route fees. Get noticed.
