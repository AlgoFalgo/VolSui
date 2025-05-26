# Config

Central place for runtime and environment variables.

### Common Variables

- `SUI_RPC_URL`: Sui mainnet RPC
- `BOT_TOKEN`: Telegram bot token
- `FEE_COLLECTOR_ADDRESS`: Default relay wallet
- `TRADING_WALLET_ADDRESS`: Wallet monitored by WalletMonitor
- `DEEPBOOK_PACKAGE`: Address of DeepBook on Sui

These can be stored in `.env` and loaded at runtime.

Consider adding a config loader file like `env.ts` to centralize access.
