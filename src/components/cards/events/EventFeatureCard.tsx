import React from 'react';
import Image from 'next/image';
import { NetworkEnum } from '@/config';
import { Box, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { PolygonBadge } from '@project/shared/src/assets';
import PollFeatureImage from '@/public/images/poll-feature.png';
import { Jazzicon } from '@bbnpolls/jazzicon/src/jazz';

interface Props {
  img?: string;
  description: string;
  postedOn: string;
  minStake: number;
  remainingTickets: number;
  closingOn: string;
  stake: number;
  network: NetworkEnum;
}

export function EventFeatureCard({ img, description, postedOn, closingOn, remainingTickets, minStake, stake }: Props) {
  const networkBg = useColorModeValue('gray.600', 'white');
  const networkColor = useColorModeValue('white', 'black');

  return (
    <Stack alignItems={'center'} spacing={6} maxW="20rem" bg={'bg-muted'} borderRadius="12" p="1.5rem" mt="4">
      {img ? (
        <Box>
          <Image src={img} alt="Poll description" />
        </Box>
      ) : (
        <Jazzicon />
      )}

      <Text textAlign={'center'}>{description}</Text>
      <Box color={'emphasized'}>
        <Text>Remaining Tickets: {remainingTickets}</Text>
        <Text>Minimun Stake: {minStake} MATIC</Text>
      </Box>
      <Box>
        <Text>Posted on: {postedOn}</Text>
        <Text>Closing date: {closingOn}</Text>
      </Box>

      <HStack bg={networkBg} color={networkColor} px="1rem" borderRadius={24} width="14rem" justifyContent={'space-between'}>
        <PolygonBadge w={8} margin={0} />
        <Text>{stake} MATIC staked</Text>
      </HStack>
    </Stack>
  );
}

EventFeatureCard.defaultProps = {
  img: PollFeatureImage,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit?',
  postedOn: 'August 4 2022',
  closingOn: 'August 4 2022',
  minStake: 5,
  remainingTickets: 497,
  stake: 348,
  network: NetworkEnum.HARMONY_TESTNET,
};
