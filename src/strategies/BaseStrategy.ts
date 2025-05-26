// src/strategies/BaseStrategy.ts
export enum StrategyType {
  ONE_SHOT = 'one_shot',
  GRID = 'grid',
  LOOP = 'loop'
}

export interface RiskMetrics {
  drawdown: number;
  volume24h: number;
  failedTxCount: number;
}

export interface StrategyParams {
  amount: number;
  tokenAddress: string;
  userWallet: string;
}

export abstract class BaseStrategy {
  abstract execute(params: StrategyParams): Promise<{ txId: string }>;
  abstract validateParams(params: StrategyParams): boolean;
  abstract calculateRisk(metrics: RiskMetrics): boolean;
}