import fs from 'fs/promises';
const LOG_PATH = './data/txlog.json';

export async function logTx({
  txId,
  token,
  amount,
  fee,
  wallet
}: {
  txId: string;
  token: string;
  amount: number;
  fee: number;
  wallet: string;
}) {
  const newEntry = {
    txId,
    token,
    amount,
    fee,
    wallet,
    timestamp: new Date().toISOString()
  };

  let logs = [];
  try {
    const raw = await fs.readFile(LOG_PATH, 'utf-8');
    logs = JSON.parse(raw);
  } catch (_) {}

  logs.push(newEntry);
  await fs.writeFile(LOG_PATH, JSON.stringify(logs, null, 2));
}
