import { Wrapper, WrapperEnum } from '@/components/partials';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { PredictionTabs } from './components';

const PredictionPage = () => {
  return (
    <Wrapper context={WrapperEnum.INNER}>
      <Stack>
        <PredictionTabs />
      </Stack>
    </Wrapper>
  );
};

export default PredictionPage;
