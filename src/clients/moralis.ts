import Moralis from 'moralis';

export const getMoralis = async () => {
  return await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
}