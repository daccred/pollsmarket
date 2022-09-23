// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '@/next/router';
import { createContext } from '@/next/router/context';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
