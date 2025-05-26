// src/api/analyticsRoutes.ts
import { FastifyInstance } from 'fastify';
import { StrategyLogger } from '../services/StrategyLogger';

export async function analyticsRoutes(
  fastify: FastifyInstance,
  logger: StrategyLogger
) {
  fastify.get('/analytics/:vaultId', async (request, reply) => {
    const { vaultId } = request.params as any;
    
    try {
      const summary = await logger.getAnalyticsSummary(vaultId);
      return reply.send(summary);
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  });
}
