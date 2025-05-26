// src/config/env.ts
import { config } from 'dotenv';
config();

export const env = {
  BOT_TOKEN: process.env.BOT_TOKEN!,
  SUI_RPC_URL: process.env.SUI_RPC_URL!,
  FEE_COLLECTOR_ADDRESS: process.env.FEE_COLLECTOR_ADDRESS!,
  TRADING_WALLET_ADDRESS: process.env.TRADING_WALLET_ADDRESS!,
  DEEPBOOK_PACKAGE: process.env.DEEPBOOK_PACKAGE!
};