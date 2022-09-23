import React, { Suspense } from 'react';
import { Stack, Box, Heading, Flex } from '@chakra-ui/react';
import { SummaryCardSkeleton } from '@/components/core/SkeletonLoader';

/* Internal card components */
import { EventSummaryCard, CardQueryParams } from '@/components/cards';
import { Banner, Wrapper, WrapperEnum } from '@/components/partials';

import { routes } from '@/config';
import { Onuahia__factory } from '@bbnpolls/chain/types';
import { trpc } from '@/clients/trpc';

type TMarketResponse = CardQueryParams & {
  contractAddress: string;
};

export default function View() {
  const markets = trpc.useQuery(['market.getMarketRange', { offset: 0, limit: 10 }]);

  const events = markets.data as unknown as TMarketResponse[];

  return (
    <Wrapper context={WrapperEnum.CONTAIN}>
      <Banner />

      {/* Render the events */}
      <Box maxW={{ base: 'xl', md: '8xl' }} w={'full'} my={[4, 16]} mx="auto" px={{ base: 2, md: '8' }}>
        <Stack w={'full'} textAlign={{ base: 'center' }}>
          <Heading textAlign={{ base: 'center', lg: 'left' }} size="xs" my={2} color="emphasized">
            Popular Events
          </Heading>

          {markets.isFetching ? (
            <SummaryCardSkeleton fill={6} isFetching={markets.isFetching} />
          ) : (
            <Suspense fallback={<SummaryCardSkeleton fill={6} />}>
              <Flex w={'full'} wrap={'wrap'} gap={{ base: 4, md: 4 }} justifyContent={{ base: 'center', lg: 'space-between' }}>
                {events &&
                  events.map((event, index) => (
                    <EventSummaryCard
                      key={index}
                      href={`${routes.markets.root}/${event.contractAddress}`}
                      fee={event.fee}
                      redisKey={event.redisKey}
                      stakingAmount={event.stakingAmount}
                      question={event.question}
                      closedAt={event.closedAt}
                      outcomes={event.outcomes}
                      createdAt={event.createdAt}
                      contractInterface={Onuahia__factory.abi}
                      addressOrName={event.contractAddress as string}
                      maxTicketSupply={event.maxTicketSupply}
                    />
                  ))}
              </Flex>
            </Suspense>
          )}
        </Stack>
      </Box>
      {/* Render the events */}

      {/* hack to create space padding bottom for mobile */}
      <Box h={[24, 12]} py={[12, 8]} />
    </Wrapper>
  );
}
