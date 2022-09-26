import { createRouter } from './context';
import * as resolvers from './resolvers/prediction.resolver';

export const predictionRouter = createRouter().query('byWallet', {
  input: resolvers.byWalletSchema,
  async resolve({ input }) {
    const result = await resolvers.getTokensForWalletByMarket({
      walletAddress: input.walletAddress,
      tokenAddress: input.tokenAddress
    })

    return result;
  },
});
