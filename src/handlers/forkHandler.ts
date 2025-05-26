import { Context } from 'telegraf';
import fs from 'fs/promises';

const REGISTRY_PATH = './data/forkRegistry.json';

export async function handleForkBot(ctx: Context) {
  const userId = ctx.from?.id.toString();
  if (!userId) return;

  const args = ctx.message?.text?.split(' ').slice(1);
  const [tokenAddress, feeWallet] = args || [];

  if (!tokenAddress || !feeWallet) {
    return ctx.reply('❌ Usage: /fork_bot <token_address> <fee_wallet>');
  }

  const entry = {
    deployer: userId,
    token: tokenAddress,
    feeWallet
  };

  try {
    let existing: any[] = [];
    try {
      const raw = await fs.readFile(REGISTRY_PATH, 'utf8');
      existing = JSON.parse(raw);
    } catch (_) {}

    existing.push(entry);
    await fs.writeFile(REGISTRY_PATH, JSON.stringify(existing, null, 2));

    ctx.reply(`✅ Fork created. Your bot is live with fee wallet ${feeWallet}.`);
  } catch (e: any) {
    ctx.reply(`❌ Error saving fork: ${e.message}`);
  }
}
