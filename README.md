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

## 📐 Trade Execution Model

Let:
- `A` = Total input amount in SUI or token
- `f` = Relay fee rate (default 0.003 = 0.3%)
- `T` = Tradeable amount → `T = A * (1 - f)`
- `F` = Fee amount → `F = A * f`

VolumaSui transforms input into two linked transfers:
```text
1. Transfer(F) → relay wallet (e.g., deployer or protocol)
2. Swap(T)     → through DeepBook or Cetus pool
