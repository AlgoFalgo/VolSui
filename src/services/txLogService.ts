import fs from 'fs/promises';

const LOG_PATH = './data/txlog.json';

export async function getTxLogByWallet(wallet: string) {
  try {
    const raw = await fs.readFile(LOG_PATH, 'utf-8');
    const logs = JSON.parse(raw);

    return logs.filter((entry: any) => entry.wallet === wallet);
  } catch (error) {
    console.error('Failed to read logs:', error);
    return [];
  }
}
