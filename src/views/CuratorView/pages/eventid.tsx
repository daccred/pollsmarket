import React from 'react';
import { useRouter } from 'next/router';
import { FaChevronLeft } from 'react-icons/fa';
import { Wrapper, WrapperEnum } from '@/components/partials';
import { EventSummaryCard, InfoCard, WalletCard } from '@/components/cards';
import { Container, Heading, HStack, Icon, Stack, useColorModeValue } from '@chakra-ui/react';

const stub = {} as any;

const NewEventPage = () => {
  const router = useRouter();
  return (
    <Wrapper context={WrapperEnum.CONTAIN}>
      <HStack color={useColorModeValue('black', 'white')} _hover={{ cursor: 'pointer', color: 'orange.200' }} onClick={() => router.back()}>
        <Icon as={FaChevronLeft} fontSize={24} />
        <Heading size="xs">View Curated Event</Heading>
      </HStack>

      <Container maxW="lg">
        <Stack spacing={6} pt={{ base: 12, md: 16 }}>
          <WalletCard />
          <Heading size="sm" color={useColorModeValue('black', 'white')}>
            Event Details
          </Heading>
          <EventSummaryCard {...stub} />
          <InfoCard />
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default NewEventPage;
