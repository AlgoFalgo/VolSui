# VolumaSui

> Telegram-native Smart Volume™ engine for the Sui blockchain.

## 🔍 Overview

- Modular bot that executes volume pushes on Sui
- Triggered via Telegram or wallet deposits
- Supports fee-routed trades (DeepBook / Cetus)
- Forkable via `/fork_bot` command
- Web UI for strategy config and performance monitoring

## 🧱 Repo Structure

| Folder | Description |
|--------|-------------|
| `src/handlers` | Telegram bot commands like `/push_volume` |
| `src/services` | Wallet monitoring, trade execution logic |
| `src/config` | Environment and runtime configs |
| `docs/` | Architecture, API reference, diagrams |
| `proposal/` | Full grant submission proposal |
| `deploy/` | Hosting instructions and runtime scripts |

## 🛡️ Audit-Ready Practices

- Modular service classes for each logic domain
- Clear separation of config from logic
- Inline comments for fee and routing transparency
- Environment-based relay and token settings
- Optional support for testnets and dry-run mode

## 🧠 Get Started

Coming soon: install + deploy guide for non-coders
