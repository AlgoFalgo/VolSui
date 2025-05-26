// src/api/strategyRoutes.ts
import { FastifyInstance } from 'fastify';
import { StrategyType } from '../strategies/BaseStrategy';
import { RiskManager } from '../services/RiskManager';
import { StrategyLogger } from '../services/StrategyLogger';
import { StrategyFactory } from '../strategies/StrategyFactory';

export async function strategyRoutes(
  fastify: FastifyInstance,
  riskManager: RiskManager,
  logger: StrategyLogger
) {
  fastify.post('/strategy/execute', async (request, reply) => {
    const {
      vaultId,
      strategyType,
      amount,
      tokenAddress,
      userWallet
    } = request.body as any;

    try {
      if (!await riskManager.checkRiskLimits(vaultId)) {
        throw new Error('Risk limits exceeded');
      }

      const strategy = StrategyFactory.create(strategyType as StrategyType);
      
      const result = await strategy.execute({
        amount,
        tokenAddress,
        userWallet
      });

      await logger.logStrategy({
        vaultId,
        strategyType,
        params: { amount, tokenAddress },
        result
      });

      return reply.send({ success: true, txId: result.txId });

    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  });
}
