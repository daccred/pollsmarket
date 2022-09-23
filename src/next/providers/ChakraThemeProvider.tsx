// a) import `ChakraProvider` component as well as the storageManagers
import { NextPageContext } from 'next';
import theme from '@project/shared/src/theme';
import { BRFirma } from '@project/shared/src/theme/custom';

import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from '@chakra-ui/react';
import AppStyles from '@/next/AppStyles';

export default function ChakraThemeProvider({ cookies, children }: any) {
  // b) Pass `colorModeManager` prop
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      <AppStyles font={BRFirma} />
      {children}
    </ChakraProvider>
  );
}

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }: NextPageContext) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req?.headers.cookie ?? '',
    },
  };
}
