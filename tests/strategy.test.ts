// tests/strategy.test.ts
import { OneShotStrategy } from '../src/strategies/OneShotStrategy';
import { RiskManager } from '../src/services/RiskManager';
import { StrategyLogger } from '../src/services/StrategyLogger';

describe('Strategy Tests', () => {
  const mockTradeService = {
    executeTrade: jest.fn()
  };

  const strategy = new OneShotStrategy(mockTradeService);
  const riskManager = new RiskManager();
  const logger = new StrategyLogger();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Execute One Shot Strategy', async () => {
    mockTradeService.executeTrade.mockResolvedValue({
      txId: '0xabc'
    });

    const result = await strategy.execute({
      amount: 10,
      tokenAddress: '0xtoken',
      userWallet: '0xuser'
    });

    expect(result.txId).toBe('0xabc');
    expect(mockTradeService.executeTrade).toHaveBeenCalled();
  });

  test('Risk Limits Check', async () => {
    const safe = await riskManager.checkRiskLimits('vault1');
    expect(safe).toBe(true);

    riskManager.updateMetrics('vault1', { failedTxCount: 3 });
    const unsafe = await riskManager.checkRiskLimits('vault1');
    expect(unsafe).toBe(false);
  });
});
