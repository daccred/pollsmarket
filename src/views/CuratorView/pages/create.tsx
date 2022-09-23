import React from 'react';
import { BackRouter } from '@/components/core';
import { Wrapper, WrapperEnum } from '@/components/partials';
import CreateMarketForm from '@/views/CuratorView/forms/CreateMarket';

const NewEventPage = () => {
  return (
    <Wrapper context={WrapperEnum.MOBILE}>
      <BackRouter title={'Curate Event'} />
      <CreateMarketForm />
    </Wrapper>
  );
};

export default NewEventPage;
