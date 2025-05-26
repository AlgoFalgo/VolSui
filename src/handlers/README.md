# Handlers

This folder contains all Telegram command handlers for the bot.

### Core Commands

- `volumeHandler.ts`: `/push_volume <amount> <token>` — triggers a trade with 0.3% fee
- `forkHandler.ts` *(coming soon)*: `/fork_bot` — lets users deploy their own branded bot
- `txLogHandler.ts` *(optional)*: `/txlog` — shows TX history

Each handler connects to services like TradeService or WalletMonitor to keep logic modular.

