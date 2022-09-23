import React from 'react';
import View from '@/views/PredictionView';

/* Page components */
import { Meta } from '@/next/index';
import { ProgressiveLayout } from '@/components/partials';

/* We always export pages as PAGE */
export default function Page() {
  return (
    <React.Fragment>
      <Meta />
      <View />
    </React.Fragment>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <ProgressiveLayout>{page}</ProgressiveLayout>;
};
