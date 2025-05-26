// src/services/RiskManager.ts
import { RiskMetrics } from '../strategies/BaseStrategy';

export class RiskManager {
  private metrics: Map<string, RiskMetrics> = new Map();

  async checkRiskLimits(vaultId: string): Promise<boolean> {
    const metrics = this.metrics.get(vaultId) || {
      drawdown: 0,
      volume24h: 0,
      failedTxCount: 0
    };

    return metrics.drawdown < 0.1 && 
           metrics.volume24h < 1000 && 
           metrics.failedTxCount < 3;
  }

  updateMetrics(vaultId: string, metrics: Partial<RiskMetrics>) {
    const current = this.metrics.get(vaultId) || {
      drawdown: 0,
      volume24h: 0,
      failedTxCount: 0
    };
    this.metrics.set(vaultId, { ...current, ...metrics });
  }
}
