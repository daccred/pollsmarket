import React from 'react';
import np from 'nprogress';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ScaleFade } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
// import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary, WagmiRainbowKitProvider, ChakraThemeProvider } from '@/next/index';

// trpc setup
import superjson from 'superjson';
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '@/next/router';
import type { NextPageWithLayout } from 'next';

/* Rainbowkit and Swiper css */
import '@project/shared/src/assets/rainbow.css';
// import '@rainbow-me/rainbowkit/styles.css';
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


/* Initialize Next page & layout configs */
// type NextPageWithLayout<P = unknown> = NextPage<P> & 
// { getLayout?: (page: React.ReactElement) => AppType };
import { __BROWSER__, __DEV__ } from '@/config';

type Props = AppProps & {
  Component: NextPageWithLayout;
  pageProps: any;
};

function MyApp({ Component, pageProps, router }: Props) {
  const getLayout = Component.getLayout || ((page: React.ReactElement) => page);
  const { ToastContainer } = createStandaloneToast();

  /* Hook nprogress with router */
  useEffect(() => {
    const handleStart = (url: string) => {
      // eslint-disable-next-line no-console
      __DEV__ && console.log(`[Loading: ${url}]`);
      np.start();
    };
    const handleStop = () => {
      np.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <WagmiRainbowKitProvider>
      {/* <SessionProvider session={pageProps.session}> */}
      {/* We use this so that chakra color mode can be injected from cookies */}
      {/* @see https://v1.chakra-ui.com/docs/styled-system/features/color-mode#add-colormodemanager-optional-for-ssr */}
      <ChakraThemeProvider cookies={pageProps.cookies}>
        <ErrorBoundary>
          {getLayout(
            <ScaleFade key={router.route} initialScale={0.93} in={true}>
              <Component {...pageProps} />
            </ScaleFade>
          )}
        </ErrorBoundary>
      </ChakraThemeProvider>
      <ToastContainer />
      {/* </SessionProvider> */}
    </WagmiRainbowKitProvider>
  );
}

export { getServerSideProps } from '@/next/providers/ChakraThemeProvider';

const getBaseUrl = () => {
  if (__BROWSER__) {
    return '';
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
