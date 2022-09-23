import * as React from 'react';
import { TopNavigation } from './Navigation/TopNavigation';
import { BottomNavigation as ConditionalBottom } from './Navigation/BottomNavigation';
import { NextPageLayout } from './Wrapper';

interface ProgressiveLayoutProps {
  children: React.ReactNode;
}

export function ProgressiveLayout({ children }: ProgressiveLayoutProps) {
  return (
    <NextPageLayout>
      <TopNavigation />
      {children}
      <ConditionalBottom />
    </NextPageLayout>
  );
}
