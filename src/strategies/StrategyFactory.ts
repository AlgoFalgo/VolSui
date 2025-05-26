// src/strategies/StrategyFactory.ts
import { StrategyType, BaseStrategy } from './BaseStrategy';
import { OneShotStrategy } from './OneShotStrategy';
import { GridStrategy } from './GridStrategy';
import { LoopStrategy } from './LoopStrategy';
import { TradeService } from '../services/TradeService';

export class StrategyFactory {
  static create(type: StrategyType, tradeService: TradeService): BaseStrategy {
    switch (type) {
      case StrategyType.ONE_SHOT:
        return new OneShotStrategy(tradeService);
      case StrategyType.GRID:
        return new GridStrategy(tradeService);
      case StrategyType.LOOP:
        return new LoopStrategy(tradeService);
      default:
        throw new Error(`Unknown strategy type: ${type}`);
    }
  }
}
