import { FastifyInstance } from 'fastify';
import { getTxLogByWallet } from '../services/txLogService';

export async function txLogRoutes(fastify: FastifyInstance) {
  fastify.get('/txlog', async (request, reply) => {
    const wallet = request.query.wallet as string;

    if (!wallet) {
      return reply.status(400).send({ error: 'Missing wallet address' });
    }

    const logs = await getTxLogByWallet(wallet);
    return reply.send(logs);
  });
}

