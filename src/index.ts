import Fastify from 'fastify';
import { txLogRoutes } from './api/txlog';

const app = Fastify();

app.register(txLogRoutes);

app.listen({ port: 3000 }, () => {
  console.log('Backend running at http://localhost:3000');
});
