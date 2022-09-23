import React from 'react';
import { Stack, Skeleton, Box, HStack, SkeletonCircle, SkeletonText, Flex } from '@chakra-ui/react';

type Props = {
  fill?: number;
  isFetching?: boolean;
};

export function SummaryCardSkeleton({ fill = 6, isFetching = true }: Props) {
  return (
    <Flex
      w={'full'}
      display={isFetching ? 'inherit' : 'none'}
      wrap={'wrap'}
      gap={{ base: 4, md: 4 }}
      justifyContent={{ base: 'center', lg: 'space-between' }}
    >
      {Array(fill)
        .fill(fill)
        .map((event, index) => (
          <Box bg={'bg-surface'} p={8} height={'full'} rounded={'3xl'} maxW="27rem" w={'full'} key={`${event}-${index}`}>
            <HStack justify={'space-between'}>
              <SkeletonCircle size="16" w={'17%'} />
              <SkeletonText w={'75%'} noOfLines={3} spacing="4" />
            </HStack>

            <Stack mt={6}>
              <Skeleton height={'24px'} />
              <Skeleton height={'24px'} />
              <Skeleton height={'24px'} />
            </Stack>
            <SkeletonText mb={6} mt={2} noOfLines={1} spacing="4" />

            <HStack justify={'space-between'}>
              <SkeletonText mt="4" w={'50%'} noOfLines={2} spacing="4" />
              <SkeletonCircle size="10" w={'40%'} />
            </HStack>
          </Box>
        ))}
    </Flex>
  );
}

export function ProgressSkeleton() {
  return (
    <Stack mt={6}>
      <Skeleton height={'24px'} />
    </Stack>
  );
}
