import { DetailCard, InfoCard } from '@/components/cards';
import { Wrapper, WrapperEnum } from '@/components/partials';
import Footer from '@/components/partials/Footer';
import { Center, Stack } from '@chakra-ui/react';

import React from 'react';
import { PredictionForm } from '..';

const EventPage = () => (
  <Wrapper context={WrapperEnum.MOBILE}>
    <Stack spacing={8}>
      {/* --------- Card with actions to make about prediction --------- */}
      <DetailCard variant="filled" />
      {/* --------- Card with actions to make about prediction --------- */}

      <PredictionForm />

      {/* ----------- The Prediction Info cards Line up ------------ */}
      <InfoCard />
      {/* ----------- The Prediction Info cards Line up ------------ */}
    </Stack>
    <Center>
      <Footer />
    </Center>
  </Wrapper>
);

export default EventPage;
