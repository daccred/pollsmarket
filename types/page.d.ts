/* eslint-disable @typescript-eslint/ban-types */
import { NextPage } from 'next';
import type { NextComponentType } from 'next/dist/next-server/lib/utils';
import { ComponentType, ReactElement, ReactNode } from 'react';

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

declare module 'next' {
  export declare type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout: (component: NextComponentType) => JSX.Element;
  };
}
