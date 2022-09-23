import React from 'react';
import { EventSummaryCard } from '@/components/cards';
import { Wrapper, WrapperEnum } from '@/components/partials';
import { Container, Stack } from '@chakra-ui/react';

import { BackRouter } from '@/components/core';

const CuratorEventPage = () => {
  return (
    <Wrapper context={WrapperEnum.CONTAIN}>
      <BackRouter title="Manage Event" />
      <Container maxW="lg">
        <Stack spacing={6} pt={{ base: 12, md: 16 }}>
          {Array(10)
            .fill(0)
            .map((data, index) => (
              <EventSummaryCard key={index} {...(data as any)} />
            ))}
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default CuratorEventPage;
