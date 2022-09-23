import { NetworkEnum } from '@/config';
import { Button, Flex, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { PolygonBadge } from '@project/shared/src/assets';
import React from 'react';

interface Props {
  network: NetworkEnum;
  balance: number;
}

export function WalletCard({ balance }: Props) {
  const color = useColorModeValue('black', 'white');
  const bg = useColorModeValue('gray', 'gray.600');
  return (
    <Stack spacing={6} px={4} py={6} bg={bg} borderRadius="12">
      <Text color={color}>My Earnings</Text>
      <Flex m={0} alignItems={'center'} justifyContent="space-between">
        <HStack my={0} maxH={1}>
          <PolygonBadge width="6" />
          <Text fontSize="2.5rem" color={color}>
            {balance}
          </Text>
        </HStack>
        <Button size={'sm'} borderRadius={24} color="orange.600" bg="orange.200">
          Withdraw
        </Button>
      </Flex>
    </Stack>
  );
}

WalletCard.defaultProps = { network: NetworkEnum.HARMONY_TESTNET, balance: '$0,000' };
