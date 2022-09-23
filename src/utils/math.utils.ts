/*---------------------------------------------------------*
   * Crypto Utils for dealing with wallet and digits
   ----------------------------------------------------------*/

export function formatAddress(address = '') {
  return address.slice(0, 6).concat('...', address.slice(-6));
}

export function formatBalance(balance = '', decimals = 18, network = 'ETH'): number {
  //https://docs.binance.org/account.html
  // let bscDesc = Number(10).toExponential(decimals)
  // console.log(bscDesc)

  if (network === 'BSC') {
    return Number(balance) / 10 ** 8;
  }
  return Number(balance) / 10 ** decimals;
}

export const formatBalanceToDecimal = (balance = '', decimals = 18, network = 'ETH') => {
  return Math.round((formatBalance(balance, decimals, network) + Number.EPSILON) * 1000) / 1000;
};

export function toWei(balance = '', decimals = 18) {
  return `0x${(Number(balance) * 10 ** decimals).toString(16)}`;
}

export function zeroAddress() {
  return '0x0000000000000000000000000000000000000000';
}

export function getCurrentAddress() {
  return ((window as any).ethereum?.selectedAddress ?? '').toLowerCase();
}

export async function getCurrentAddressAsync(web3: { eth: { getAccounts: () => any } }) {
  const accounts = await web3.eth.getAccounts();
  return (accounts?.[0] ?? '').toLowerCase();
}

export function toGwei(wei: number) {
  return Math.round(wei / 1e9);
}

export function formatNumberIntl(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(value);
}

export const IPFS_GATEWAY = 'https://lens.infura-ipfs.io/ipfs/';
/**
 *
 * @param hash - IPFS hash
 * @returns IPFS link
 */
const getIPFSLink = (hash: string): string => {
  const gateway = IPFS_GATEWAY;

  return hash
    .replace(/^Qm[1-9A-Za-z]{44}/gm, `${gateway}${hash}`)
    .replace('https://ipfs.io/ipfs/', gateway)
    .replace('ipfs://', gateway);
};

export default getIPFSLink;
