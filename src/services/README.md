# Services

These are modular service classes used by the bot.

- `TradeService.ts`: Handles trade execution, fee splitting, Sui transaction logic
- `WalletMonitor.ts`: Watches for deposits and triggers trades
- `SessionService.ts`: Used to track per-user or per-bot config
- `StrategyService.ts` *(optional)*: Could extend to support advanced logic

All services use dependency injection for auditability and testability.
