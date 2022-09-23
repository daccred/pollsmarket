import { Wrapper, WrapperEnum } from '@/components/partials';
import { Container } from '@chakra-ui/react';
import React from 'react';
import { CuratorForm } from '../forms/CuratorForm';

const AddCuratorPage = () => {
  return (
    <Wrapper context={WrapperEnum.INNER}>
      <Container maxW="lg">
        <CuratorForm />
      </Container>
    </Wrapper>
  );
};

export default AddCuratorPage;
