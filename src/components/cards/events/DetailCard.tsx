import { NetworkEnum } from '@/config/enums';
import { Box, HStack, VStack, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { Jazzicon } from '@bbnpolls/jazzicon/src/jazz';
import { PolygonBadge } from '@project/shared/src/assets';

interface Props {
  variant?: 'simple' | 'filled';
  img?: string;
  question: string;
  createdAt: string;
  minStake: number;
  remainingTickets: number;
  closedAt: string;
  fee: number;
  network: NetworkEnum;
}

export function DetailCard({ variant, minStake, remainingTickets, img, question, createdAt, closedAt, fee }: Props) {
  const stakeBg = useColorModeValue('black', 'orange.200');
  const bg = useColorModeValue('gray', 'gray.600');
  const networkBg = useColorModeValue('gray.600', 'white');
  const networkColor = useColorModeValue('white', 'black');

  return (
    <Box>
      <HStack color={stakeBg} justifyContent="space-between">
        <Text>Remaining Tickets: {remainingTickets}</Text>
        <Text>Minimum Stake: {minStake}</Text>
      </HStack>
      <Stack alignItems={'center'} spacing={6} borderRadius="12" p="1.5rem" mt="4" bg={variant == 'filled' ? bg : 'inherit'}>
        <HStack justifyContent={'space-between'}>
          <Box>
            {img ? (
              <Box>
                <Image src={img} alt="Poll question" />
              </Box>
            ) : (
              <Jazzicon />
            )}
          </Box>
          <Text textAlign={'center'}>{question}</Text>
        </HStack>
        <VStack justifyContent={'space-between'} width="full">
          {variant == 'filled' && (
            <Box>
              <Text fontSize={'sm'}>Posted on: {createdAt}</Text>
              <Text fontSize={'sm'}>Closing date: {closedAt}</Text>
            </Box>
          )}
          <HStack bg={networkBg} align={'center'} color={networkColor} px="0.5rem" rounded={'2xl'} spacing={2} w={'max-content'} h={'2rem'}>
            <PolygonBadge w={6} />
            <Text fontSize={'sm'}>{fee} MATIC staked</Text>
          </HStack>
        </VStack>
      </Stack>
    </Box>
  );
}
DetailCard.defaultProps = {
  question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit?',
  createdAt: 'August 4 2022',
  closedAt: 'August 4 2022',
  minStake: 5,
  remainingTickets: 497,
  fee: 348,
  network: NetworkEnum.HARMONY_TESTNET,
  variant: 'filled',
};
