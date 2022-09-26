import { createRouter } from './context';
import Schema from '@/views/CuratorView/forms/CreateMarket/_schema';
import xxh from 'xxhashjs';
import { z } from 'zod';
import redis from '@/clients/redis';

const SEASON_KEY = 'markets:sept';

export const marketRouter = createRouter()
  /* client operation */
  .mutation('createMarket', {
    input: Schema.trpcInputSchema,

    /* resolution for the API */
    async resolve({ input }) {
      // const xata = getXataClient();

      /* setup the schema based off form model */
      console.warn(input, 'staright from api <><><><><><><<>');

      // handle api operation and return result
      const redisKey = xxh.h32(input.contractAddress, 0xcafebabe).toString(16);

      /* persist a hash to key of the market: for findOne Queries  */
      const data = await redis.hset(redisKey, { redisKey, ...input });

      /* Create an array list of all markets */
      const markets = await redis.lpush(SEASON_KEY, { redisKey, ...input });

      console.warn('[trpc query]', data, markets);
      return { redisKey, ...input };
    },
  })
  .query('getMarketRange', {
    input: z.object({
      offset: z.number(),
      limit: z.number(),
    }),
    async resolve({ input }) {
      return await redis.lrange(SEASON_KEY, input.offset, input.limit);
    },
  });
