import dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';
import Fastify from 'fastify';

import { env } from './config/env';
import { VolumeHandler } from './handlers/volumeHandler';
import { WalletMonitor } from './services/WalletMonitor';
import { TradeService } from './services/TradeService';
import { txLogRoutes } from './api/txlog';

const bot = new Telegraf(env.BOT_TOKEN);

const tradeService = new TradeService(env.SUI_RPC_URL, env.FEE_COLLECTOR_ADDRESS);
const volumeHandler = new VolumeHandler(tradeService);

// Register Telegram commands
bot.command('push_volume', (ctx) => volumeHandler.handlePushVolume(ctx));

// Start bot
bot.launch().then(() => {
  console.log('🤖 Telegram bot running...');
});

// Start wallet monitor
const walletMonitor = new WalletMonitor(env.SUI_RPC_URL, tradeService);
walletMonitor.monitorWallet(env.TRADING_WALLET_ADDRESS);

// Start Fastify API
const app = Fastify();
app.register(txLogRoutes);

app.listen({ port: 3000 }, () => {
  console.log('🚀 API server listening on http://localhost:3000');
});
