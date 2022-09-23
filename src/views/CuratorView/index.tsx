import { ValuePropsCard } from '@/components/cards';
import { Wrapper, WrapperEnum } from '@/components/partials';
import { routes } from '@/config';
import { Container, Stack } from '@chakra-ui/react';
import React from 'react';
import { AddCuratorCard } from './components';

const CuratorPage = () => {
  return (
    <Wrapper context={WrapperEnum.INNER}>
      <Container maxW="lg">
        <Stack spacing={6}>
          <ValuePropsCard link={routes.curator.events} />
          <ValuePropsCard isNew link={routes.curator.eventForm} />
          <AddCuratorCard />
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default CuratorPage;
