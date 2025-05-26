// src/services/RiskManager.ts
import { RiskMetrics } from '../strategies/BaseStrategy';

export class RiskManager {
  private circuitBreakerTriggered = false;
  private metrics: Map<string, RiskMetrics> = new Map();

  async checkRiskLimits(vaultId: string): Promise<boolean> {
    if (this.circuitBreakerTriggered) {
      return false;
    }

    const metrics = this.metrics.get(vaultId) || {
      drawdown: 0,
      volume24h: 0,
      failedTxCount: 0
    };

    if (metrics.failedTxCount >= 3) {
      this.triggerCircuitBreaker(vaultId);
      return false;
    }

    return metrics.drawdown < 0.1 && metrics.volume24h < 1000;
  }

  private triggerCircuitBreaker(vaultId: string) {
    this.circuitBreakerTriggered = true;
    console.log(`Circuit breaker triggered for vault ${vaultId}`);
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
