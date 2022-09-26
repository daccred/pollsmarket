// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { marketRouter } from './market';
import { predictionRouter } from './prediction';
import { protectedExampleRouter } from './protected-example-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', protectedExampleRouter)
  .merge('market.', marketRouter)
  .merge('prediction.', predictionRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
