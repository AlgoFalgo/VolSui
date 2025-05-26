import { Context } from 'telegraf';
import { TradeService } from '../services/TradeService';

export class VolumeHandler {
  constructor(private tradeService: TradeService) {}

  async handlePushVolume(ctx: Context) {
    const userId = ctx.from?.id.toString();
    if (!userId) return;

    try {
      const [amountStr, tokenAddress] = ctx.message?.text?.split(' ').slice(1) || [];
      const amount = parseFloat(amountStr);

      if (!amount || !tokenAddress) {
        return await ctx.reply("❌ Usage: /push_volume <amount> <token_address>");
      }

      await ctx.reply('🔄 Executing trade...');

      const result = await this.tradeService.executeTrade({
        amount,
        tokenAddress,
        userWallet: ctx.from?.id.toString() || 'unknown'
      });

      await ctx.reply(`✅ Trade complete!\nTX: https://suiscan.xyz/tx/${result.txId}`);

    } catch (err: any) {
      await ctx.reply(`❌ Error: ${err.message}`);
    }
  }
}
