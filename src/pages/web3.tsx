import React from 'react';
import View from '@/views/ConnectView';

/* Page components */
import { Meta } from '@/next/index';
import { DarkModeSwitch } from '@/components/core/DarkModeSwitch';

/* We always export pages as PAGE */
export default function Page() {
  return (
    <React.Fragment>
      <Meta />
      <DarkModeSwitch />
      <View />
    </React.Fragment>
  );
}
