import dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';
import Fastify from 'fastify';

import { env } from './config/env';
import { VolumeHandler } from './handlers/volumeHandler';
import { handleForkBot } from './handlers/forkHandler';
import { WalletMonitor } from './services/WalletMonitor';
import { TradeService } from './services/TradeService';
import { txLogRoutes } from './api/txlog';
// src/index.ts
import { strategyRoutes } from './api/strategyRoutes';
import { RiskManager } from './services/RiskManager';
import { StrategyLogger } from './services/StrategyLogger';
// Add to src/index.ts
import { analyticsRoutes } from './api/analyticsRoutes';

// Register analytics routes
app.register(analyticsRoutes, { logger: strategyLogger });

const riskManager = new RiskManager();
const strategyLogger = new StrategyLogger();

// Add strategy routes
app.register(strategyRoutes, { riskManager, strategyLogger });

const bot = new Telegraf(env.BOT_TOKEN);

const tradeService = new TradeService(env.SUI_RPC_URL, env.FEE_COLLECTOR_ADDRESS);
const volumeHandler = new VolumeHandler(tradeService);

// Register Telegram commands
bot.command('push_volume', (ctx) => volumeHandler.handlePushVolume(ctx));
bot.command('fork_bot', (ctx) => handleForkBot(ctx));

// Start the Telegram bot
bot.launch().then(() => {
  console.log('🤖 Telegram bot running...');
});

// Start the wallet monitor
const walletMonitor = new WalletMonitor(env.SUI_RPC_URL, tradeService);
walletMonitor.monitorWallet(env.TRADING_WALLET_ADDRESS);

// Start the Fastify API server
const app = Fastify();
app.register(txLogRoutes);

app.listen({ port: 3000 }, () => {
  console.log('🚀 API server ready at http://localhost:3000');
});
