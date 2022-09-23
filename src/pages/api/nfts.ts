import Moralis from 'moralis';

export default async function handler(req, res) {
    // reads the api key from .env.local and starts Moralis SDK
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });


 const nftList = await Moralis.EvmApi.nft.getWalletNFTs({
     address: req.user.address,
     tokenAddress: '0x...',
 });

 return {
     props: {
         message:
             // if user has at least one NFT he will get protected content
             nftList.raw.total > 0 ? 'Nice! You have our NFT' : "Sorry, you don't have our NFT",
         nftTokens: nftList.raw.result,
     },
 }
}