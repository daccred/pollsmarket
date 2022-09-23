import { chain, chainId } from 'wagmi';
import { Chain } from '@rainbow-me/rainbowkit';
import { HarmonyBadge, BinanceBadge, EthereumBadge, AvalancheBadge } from '@project/shared/src/assets';

type ChainIndex = 'harmony' | 'harmonyTestnet' | 'avalanche' | 'bsc' | 'bscTestnet';
export type NetworkIndex = ChainIndex | keyof typeof chainId;

export type NetworkHexIndex =
  | '0x1'
  | '0x3'
  | '0x4'
  | '0x2a'
  | '0x5'
  | '0x539'
  | '0xa86a'
  | '0x38'
  | '0x61'
  | '0x89'
  | '0x13881'
  | '0x6357d2e0'
  | '0x63564C40';

/**
 * @dev This network config extend the RainbowKit Chain with support for icon info
 * @see RainbowKitChain @rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext
 */
export interface NetworkConfig extends Chain {
  wrapped?: string;
  networkHex?: number | undefined; // network hex used for RPC and wallet switchers
  iconUrl?: string | (() => Promise<string>);
  iconComponent?: React.ComponentType<any>;
  /* Use a HEX or suitable color string */
  iconBackground?: string;
}

export const networkConfigs: Record<NetworkIndex, NetworkConfig> = {
  ...chain,
  mainnet: {
    ...chain.mainnet,
    iconComponent: EthereumBadge,
  },
  harmonyTestnet: {
    id: 16667_00000,
    name: 'Harmony Testnet',
    network: 'harmonyTestnet',
    networkHex: 0x6357d2e0,
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18,
    },
    iconComponent: HarmonyBadge,
    iconUrl: '/images/harmony.png',
    iconBackground: '#F1F1F1',
    testnet: true,
    rpcUrls: {
      default: 'https://api.s0.b.hmny.io',
      infura: 'https://api.s0.b.hmny.io',
    },
    blockExplorers: {
      default: {
        name: 'Harmony Pops',
        url: 'https://explorer.pops.one/',
      },
    },
  },
  harmony: {
    id: 16666_00000,
    name: 'Harmony Mainnet',
    network: 'harmonyMainnet',
    networkHex: 0x63564c40,
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18,
    },
    iconComponent: HarmonyBadge,
    iconUrl: '/images/harmony-badge.svg',
    iconBackground: '#00123',
    testnet: false,
    rpcUrls: {
      default: 'https://api.harmony.one',
    },
    blockExplorers: {
      default: {
        name: 'Harmony Explorer',
        url: 'https://explorer.harmony.one/',
      },
    },
  },
  avalanche: {
    id: 43_114,
    name: 'Avalanche',
    network: 'avalanche',
    iconComponent: AvalancheBadge,
    iconUrl: 'https://example.com/icon.svg',
    iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: 'Avalanche',
      symbol: 'AVAX',
    },
    rpcUrls: {
      default: 'https://api.avax.network/ext/bc/C/rpc',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
      etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    testnet: false,
  },
  bsc: {
    id: 56,
    name: 'Binance Smart Chain',
    network: 'bsc',
    iconComponent: BinanceBadge,
    iconUrl: 'https://example.com/icon.svg',
    iconBackground: '#000',
    nativeCurrency: {
      decimals: 18,
      name: 'Binance Token',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: 'https://bsc-dataseed.binance.org',
    },
    blockExplorers: {
      default: { name: 'BSC Scan', url: 'https://bscscan.com' },
      etherscan: { name: 'BSC Scan', url: 'https://bscscan.com' },
    },
    testnet: false,
  },
  bscTestnet: {
    id: 56,
    name: 'BSC Testnet',
    network: 'bscTestnet',
    iconComponent: BinanceBadge,
    iconUrl: 'https://example.com/icon.svg',
    iconBackground: '#000',
    nativeCurrency: {
      decimals: 18,
      name: 'Binance Token',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    },
    blockExplorers: {
      default: { name: 'BSC Scan', url: 'https://testnet.bscscan.com' },
      etherscan: { name: 'BSC Scan', url: 'https://testnet.bscscan.com' },
    },
    testnet: true,
  },
};

export const getNativeByChain = (chain: ChainIndex) => networkConfigs[chain].nativeCurrency || {};

export const getChainByHex = (chain: ChainIndex) => networkConfigs[chain].networkHex || '0x1';

export const getExplorer = (chain: ChainIndex) => networkConfigs[chain].blockExplorers || {};

export const getWrappedNative = (chain: ChainIndex) => networkConfigs[chain]?.wrapped || null;
