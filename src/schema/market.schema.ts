import { z } from 'zod';

export const queryMarketOutputSchema = z.object({
  limitTicketSupply: z.boolean(),
  curator: z.string(),
  fee: z.object({ type: z.string(), hex: z.string() }),
  question: z.string(),
  resolutionLink: z.string(),
  resolutionSource: z.string(),
  stakingAmount: z.number(),
  contractAddress: z.string(),
  outcomes: z.array(z.object({ name: z.string(), value: z.string() })),
  resolutionTime: z.string(),
  transactionHash: z.string(),
  createdAt: z.string(),
  maxTicketSupply: z.number(),
  redisKey: z.string(),
  closedAt: z.string(),
});
export type QueryMarketOutput = z.infer<typeof queryMarketOutputSchema>;
