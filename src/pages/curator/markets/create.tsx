import React from 'react';
import View from '@/views/CuratorView/pages/create';

/* Page components */
import { Meta } from '@/next/index';
import { ProgressiveLayout } from '@/components/partials';

/* We always export pages as PAGE */
export default function Page() {
  return (
    <React.Fragment>
      <Meta title="Curate Event" />
      <View />
    </React.Fragment>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <ProgressiveLayout>{page}</ProgressiveLayout>;
};
