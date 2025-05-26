# 📊 VolumaSui — Telegram-Native Smart Volume™ Engine for the Sui Blockchain

VolumaSui is a modular, on-chain trading orchestration framework that enables synthetic volume ignition on Sui through a Telegram-native interface. It is engineered to simulate authentic trade activity using real DEX execution and relay-based fee routing. Ideal for token projects, ecosystem grants, or meme launches looking to catalyze visibility through economically rational, auditable trading behavior.

---

## 🧠 Concept Overview

VolumaSui provides:

- Permissionless volume execution via `/push_volume` or wallet deposit  
- On-chain routing through DeepBook or Cetus  
- Configurable relay fee (% of trade)  
- Forkable bot deployment (`/fork_bot`) with self-directed monetization  
- Transparent TX logging (`GET /txlog?wallet=...`)  

It introduces a programmable attention engine, not a price oracle. Every volume push is a real, signed Sui transaction that changes token and LP state on-chain.

---

## 📊 Trade Execution Model

Let:  
- `A` = Total input amount in SUI or token  
- `f` = Relay fee rate (default 0.003 = 0.3%)  
- `T` = Tradeable amount → `T = A * (1 - f)`  
- `F` = Fee amount → `F = A * f`

VolumaSui transforms input into two linked transfers:

```
1. Transfer(F) → relay wallet (e.g., deployer or protocol)
2. Swap(T)     → through DeepBook or Cetus pool
```

These are packaged in a single Sui transaction block, ensuring no off-chain custody and no spoofed volume.

---

## ⚙️ Architecture

```
Telegram Interface
   ├── /push_volume → volumeHandler → TradeService → DeepBook TX
   ├── /fork_bot    → forkHandler → bot registry
   └── WalletMonitor → auto-triggers TradeService on deposit

API Layer
   └── GET /txlog?wallet=0xabc... → returns TX history from /data/txlog.json
```

---

## 🔧 Features

| Feature         | Description                                        |
|----------------|----------------------------------------------------|
| `/push_volume` | Executes on-chain volume with relay fee           |
| `/fork_bot`    | Deploys a branded instance with custom config     |
| WalletMonitor  | Auto-executes trades on SUI/token deposit         |
| GET `/txlog`   | Returns JSON array of historical trades           |
| File-based logs| Simple, auditable ledger for MVP deployments      |
| Modular TS     | Services are testable, isolated, and auditable    |

---

## 📊 Why Smart Volume™ Matters

- **Attention drives adoption**: most price movement is liquidity-chasing behavior.
- **Volume drives visibility**: DEX charts, aggregators, and alerts surface high-volume tokens.
- **VolumaSui triggers visibility algorithmically** through real trades initiated by chat or wallet activity.

This is not spoofing. This is **on-chain attention engineering**.

---

## 🧮 Example: Trade Breakdown (0.3% Fee)

- Input: `A = 10.00 SUI`  
- Fee rate: `f = 0.003`  
- Fee: `F = 10.00 * 0.003 = 0.03 SUI`  
- Executed trade: `T = 10.00 - 0.03 = 9.97 SUI`

`0.03 SUI` is routed to the deployer's `FEE_COLLECTOR_ADDRESS`.  
`9.97 SUI` is executed through a DEX trade.

---

## 📁 Folder Structure

```
volumasui/
├── src/
│   ├── index.ts              # Entry point
│   ├── config/env.ts         # .env loader
│   ├── handlers/             # Telegram commands
│   ├── services/             # Trade logic, monitoring, logging
│   ├── api/txlog.ts          # API endpoint
├── data/txlog.json           # Trade history
├── proposal/full_proposal.md # Submission file
├── package.json
├── tsconfig.json
├── .env                      # (local only)
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/volumasui
cd volumasui
npm install
```

Create a `.env` file:

```env
BOT_TOKEN=your_telegram_token
SUI_RPC_URL=https://sui-mainnet-endpoint
FEE_COLLECTOR_ADDRESS=0xyourwallet
TRADING_WALLET_ADDRESS=0xbotwallet
DEEPBOOK_PACKAGE=0xdeepbook
```

Start the system:
```bash
npm run dev
```

---

## 📡 API Usage

### GET `/txlog?wallet=0xabc123...`

Returns all trades triggered by the wallet:

```json
[
  {
    "txId": "0x123...",
    "token": "0xabc...",
    "amount": 5.0,
    "fee": 0.015,
    "timestamp": "2025-05-24T12:00:00Z"
  }
]
```

Used for:
- TX logs
- Dashboards
- Volume/fee tracking

---

## 🧠 Security & Auditability

- On-chain trades only — no off-chain spoofing
- Relayer fee routing is transparent
- TXs are logged and queryable
- Logic is modular and service-isolated

---

## 💼 Use Cases

| User Type           | Utility                                    |
|---------------------|--------------------------------------------|
| Token creator       | Deploy branded Telegram bot to push volume |
| Telegram operator   | Monetize Smart Volume™ delivery via forks  |
| Launchpad / DeFi UI | Embed bot factory as SDK                   |
| Grant applicant     | Show ecosystem engagement via real trades  |

---

## 📟 License

MIT — build, fork, improve. Crediting helps visibility.

---

## ✅ TL;DR

VolumaSui gives Sui token teams programmable on-chain visibility.  
Fork it. Push volume. Route fees. Get noticed.
