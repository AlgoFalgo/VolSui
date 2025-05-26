// src/strategies/GridStrategy.ts
import { BaseStrategy, StrategyParams, RiskMetrics } from './BaseStrategy';
import { TradeService } from '../services/TradeService';

export class GridStrategy extends BaseStrategy {
  constructor(private tradeService: TradeService) {
    super();
  }

  async execute(params: StrategyParams) {
    // Grid trading logic
    return this.tradeService.executeTrade(params);
  }

  validateParams(params: StrategyParams): boolean {
    return params.amount > 0 && !!params.tokenAddress;
  }

  calculateRisk(metrics: RiskMetrics): boolean {
    return metrics.drawdown < 0.15 && metrics.failedTxCount < 5;
  }
}

// src/strategies/LoopStrategy.ts
export class LoopStrategy extends BaseStrategy {
  constructor(private tradeService: TradeService) {
    super();
  }

  async execute(params: StrategyParams) {
    // Loop trading logic
    return this.tradeService.executeTrade(params);
  }

  validateParams(params: StrategyParams): boolean {
    return params.amount > 0 && !!params.tokenAddress;
  }

  calculateRisk(metrics: RiskMetrics): boolean {
    return metrics.drawdown < 0.12 && metrics.failedTxCount < 4;
  }
}
