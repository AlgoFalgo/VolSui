// src/services/txLogService.ts
import fs from 'fs/promises';

const TX_LOG_PATH = './data/txlog.json';

interface TxLog {
  txId: string;
  token: string;
  amount: number;
  fee: number;
  wallet: string;
  timestamp: string;
}

export async function logTx(tx: Omit<TxLog, 'timestamp'>) {
  let logs: TxLog[] = [];
  try {
    const data = await fs.readFile(TX_LOG_PATH, 'utf8');
    logs = JSON.parse(data);
  } catch (_) {}

  logs.push({
    ...tx,
    timestamp: new Date().toISOString()
  });

  await fs.writeFile(TX_LOG_PATH, JSON.stringify(logs, null, 2));
}

export async function getTxLogByWallet(wallet: string): Promise<TxLog[]> {
  try {
    const data = await fs.readFile(TX_LOG_PATH, 'utf8');
    const logs: TxLog[] = JSON.parse(data);
    return logs.filter(log => log.wallet === wallet);
  } catch (_) {
    return [];
  }
}