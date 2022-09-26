
import moralis from '@/clients/moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import axios from 'axios';
import { z } from 'zod';


export const byWalletSchema =  z.object({
  walletAddress: z.string(),
  tokenAddress: z.string(),
})
export type ByWalletSchema = z.infer<typeof byWalletSchema>



const data = JSON.stringify({
  name: 'symbol + name of prediction',
  contractAddress: '0x68F054417166A9c6590Df9c5DeE9b01aD6FD340E',
  description: 'name',
  external_url: 'ipfs://bafybeihfestho6wmabjms6tu6ouvh5grkubjhut6kgjqiy2nxcat7kdn2a/html-color-codes-color-palette-generators.jpg',
  animation_url: 'ipfs://bafybeihfestho6wmabjms6tu6ouvh5grkubjhut6kgjqiy2nxcat7kdn2a/html-color-codes-color-palette-generators.jpg',
  properties: {
    outcome_name: 'Yes she will',
    outcome_value: '0x596573207368652077696c6c0000000000000000000000000000000000000000',
  },
  attributes: {
    resolutionLink: 'https://www.dstv.com/africamagic/en-ng/home',
    maxTicketSupply: '100',
    outcomes: {
      outcome_name: 'Yes she will',
      outcome_value: '0x596573207368652077696c6c0000000000000000000000000000000000000000',
    },
  },
  image: 'ipfs://bafybeihfestho6wmabjms6tu6ouvh5grkubjhut6kgjqiy2nxcat7kdn2a/html-color-codes-color-palette-generators.jpg',
});

const config = {
  method: 'post',
  url: 'https://meta.bbnpolls.xyz/v1/metadata/generate',
  headers: {
    'x-token-parameter': process.env.X_TOKEN_METASERVER,
    'Content-Type': 'application/json',
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.warn(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.warn(error);
  });



export const getTokensForWalletByMarket = async ({ walletAddress, tokenAddress }: ByWalletSchema) => {

  const chain = EvmChain.MUMBAI;

  const Moralis = await moralis();

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address: walletAddress,
    token_addresses: [tokenAddress],
    chain,

  });


  return response.raw

}