// src/services/StrategyLogger.ts
import { logTx } from './logTx';
import { StrategyType } from '../strategies/BaseStrategy';

export class StrategyLogger {
  async logStrategy(data: {
    vaultId: string,
    strategyType: StrategyType,
    params: any,
    result: { txId: string }
  }) {
    const entry = {
      ...data,
      timestamp: new Date().toISOString()
    };

    await logTx({
      txId: data.result.txId,
      token: data.params.tokenAddress,
      amount: data.params.amount,
      fee: data.params.amount * 0.003, // 0.3% fee
      wallet: data.vaultId
    });

    return entry;
  }

  async getAnalyticsSummary(vaultId: string) {
    const logs = await getTxLogByWallet(vaultId);
    
    return {
      totalVolume: logs.reduce((sum, log) => sum + log.amount, 0),
      totalFees: logs.reduce((sum, log) => sum + log.fee, 0),
      tradeCount: logs.length,
      lastTrade: logs[logs.length - 1]
    };
  }
}
