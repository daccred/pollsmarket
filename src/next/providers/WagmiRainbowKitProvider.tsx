import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import theme from '@project/shared/src/theme';

import { getDefaultWallets, wallet, connectorsForWallets, RainbowKitProvider, DisclaimerComponent } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

/* Use custom chains with Wagmi */
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { SITE_URL, SITE_NAME } from '@/config/constants';

import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit';

export const rbDarkTheme = darkTheme({
  // accentColor: theme.colors.yellow['700'],
  accentColorForeground: theme.colors.orange['100'],
  fontStack: 'rounded',
  borderRadius: 'large',
});
export const rbLightTheme = lightTheme({
  // accentColor: theme.colors.gray['200'],
  fontStack: 'rounded',
  borderRadius: 'large',
});

/* Initialize configs for Wagmi and Rainbow */
const TERMS_OF_USE = 'https://localhost/terms-of-use';
const __LOCALCHAIN__ = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai, chain.polygon, ...(__LOCALCHAIN__ ? [chain.polygonMumbai, chain.localhost, chain.rinkeby, chain.ropsten] : [])],
  [
    publicProvider(),
    alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
    jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
  ]
);

const { wallets } = getDefaultWallets({
  appName: SITE_NAME,
  chains,
});

const DisclaimerDemo: DisclaimerComponent = ({ Link, Text }) => {
  return (
    <Text>
      By connecting, you agree to this demo&apos;s <Link href={TERMS_OF_USE}>Terms of Service</Link> and acknowledge you have read and
      understand our <Link href={TERMS_OF_USE}>Disclaimer</Link>
    </Text>
  );
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Others',
    wallets: [wallet.argent({ chains }), wallet.trust({ chains }), wallet.imToken({ chains }), wallet.ledger({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

interface PartialAppProps {
  children: React.ReactNode;
}

const mapToMode = {
  light: rbLightTheme,
  dark: rbDarkTheme,
};

export default function WagmiRainbowKitProvider({ children }: PartialAppProps) {
  const mode = useColorMode();
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: `${SITE_NAME}`,
          learnMoreUrl: `${SITE_URL}`,
          disclaimer: DisclaimerDemo,
        }}
        initialChain={__LOCALCHAIN__ ? chain.localhost.id : chain.polygon.id}
        showRecentTransactions={true}
        chains={chains}
        theme={mapToMode[mode.colorMode || 'dark']}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
