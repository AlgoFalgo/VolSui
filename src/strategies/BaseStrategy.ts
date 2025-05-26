// src/strategies/BaseStrategy.ts
export enum StrategyType {
  ONE_SHOT = 'one_shot',
  GRID = 'grid',
  LOOP = 'loop'
}

export interface StrategyParams {
  amount: number;
  tokenAddress: string;
  userWallet: string;
}

export interface RiskMetrics {
  drawdown: number;
  volume24h: number;
  failedTxCount: number;
}

export abstract class BaseStrategy {
  abstract execute(params: StrategyParams): Promise<{txId: string}>;
  abstract validateParams(params: StrategyParams): boolean;
  abstract calculateRisk(metrics: RiskMetrics): boolean;
}

// src/strategies/OneShotStrategy.ts
import { BaseStrategy, StrategyParams } from './BaseStrategy';
import { TradeService } from '../services/TradeService';

export class OneShotStrategy extends BaseStrategy {
  constructor(private tradeService: TradeService) {
    super();
  }

  async execute(params: StrategyParams) {
    return this.tradeService.executeTrade(params);
  }

  validateParams(params: StrategyParams): boolean {
    return params.amount > 0 && !!params.tokenAddress;
  }

  calculateRisk(metrics: RiskMetrics): boolean {
    return metrics.drawdown < 0.1 && metrics.failedTxCount < 3;
  }
}
