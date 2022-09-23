import React, { useEffect, useState } from 'react';
import { Jazzicon } from '@bbnpolls/jazzicon/src/jazz';
import { Badge, chakra, Box, Divider, HStack, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { PolygonBadge } from '@project/shared/src/assets';
import { useBalance, useNetwork } from 'wagmi';
import { REGISTRY, routes } from '@/config';
import NextLink from 'next/link';
import { Onuahia__factory } from '@bbnpolls/chain/types';
import EventOutcomeStack from './EventOutcomes';
import { TrpcInputRequest } from '@/views/CuratorView/forms/CreateMarket/_schema';
import { ContractInterface } from 'ethers';

export interface CardQueryParams {
  image?: string;
  href: string;
  addressOrName: string;
  contractInterface: ContractInterface;
  redisKey: string;
  fee: TrpcInputRequest['fee'];
  question: TrpcInputRequest['question'];
  closedAt: TrpcInputRequest['closedAt'];
  outcomes: TrpcInputRequest['outcomes'];
  createdAt: TrpcInputRequest['createdAt'];
  stakingAmount: TrpcInputRequest['stakingAmount'];
  maxTicketSupply: TrpcInputRequest['maxTicketSupply'];
}

export const EventSummaryCard: React.FC<CardQueryParams> = ({
  closedAt,
  stakingAmount,
  maxTicketSupply,
  question,
  href,
  outcomes,
  contractInterface,
  addressOrName,
}) => {
  const [preparedOutcomes, setPreparedOutcomes] = useState<any[]>();
  const balance = useBalance({
    addressOrName,
  });
  const network = useNetwork();

  useEffect(() => {
    if (outcomes) {
      const data = outcomes.map((outcome) => ({
        ...outcome,
        addressOrName,
        contractInterface,
        functionName: 'predictions',
        args: [outcome['value']],
      }));
      /* set the outcomes map to state */
      setPreparedOutcomes(data);
    }
  }, [outcomes]);

  // console.warn({ network, account, addressOrName, rest, balance  }, '<><><><><> i am not prepared <><><<><><');

  /* Parse data for frontend */
  const currency = network.chain?.nativeCurrency?.symbol || 'MATIC';
  const supply =
    parseInt(maxTicketSupply) == 1_000_000
      ? 'UNLIMITED'
      : Math.floor((maxTicketSupply as any) - (balance.data?.formatted as any) / stakingAmount);

  return (
    <Box as="section" w={'full'} maxW={{ base: '24rem', md: '26rem' }} cursor="pointer">
      <Box
        bg={'bg-subtle'}
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        rounded="3xl"
        transition="0.3s ease-in-out"
        _hover={{
          transform: 'scale(1.024)',
        }}
        p={{ base: '4', md: '6' }}
      >
        <NextLink href={href || '#'} passHref>
          <Stack spacing={4}>
            <Stack align={'center'} justify="space-between" direction={{ base: 'row', sm: 'row' }} spacing={{ base: 0, md: 2 }}>
              <Box w={'4rem'} display={{ base: 'none', md: 'inherit' }}>
                <Jazzicon w={16} />
              </Box>
              <Stack w={'full'}>
                <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="medium">
                  {question}
                </Text>
              </Stack>
            </Stack>

            <EventOutcomeStack outcomes={preparedOutcomes} />

            <HStack spacing={[0, 1]} color={'emphasized'} justify={'space-between'} fontSize={{ base: 'xs', md: 'sm' }}>
              <Text>
                Remaining Tickets <strong>{supply} </strong>
              </Text>
              <Text>
                Stake <chakra.strong color={'purple.300'}>{`${stakingAmount} ${currency}`}</chakra.strong>
              </Text>
            </HStack>

            <Divider h={'.4px'} bg={'bg-accent'} />
            <HStack fontSize={{ base: 'xs', md: 'sm' }} justify={'space-between'} align={'stretch'} flexDir={{ base: 'column', md: 'row' }}>
              <Stack spacing={0} mb={{ base: 4, md: 0 }} flexDir={{ base: 'row', md: 'column' }} justify={'space-between'}>
                {/* <Text color={'muted'} display={{ base: 'none', md: 'inherit' }}>
                                        <>
                                        <strong>Posted - </strong>
                                         {new Date(createdAt as any).toUTCString()}
                                         </>
                                    </Text> */}
                <Text color={'muted'}>
                  <>
                    <strong>Closing - </strong>
                    {new Date(closedAt as any).toUTCString()}
                  </>
                </Text>
              </Stack>

              <Badge variant="subtle" height={'full'} colorScheme={'purple'} rounded={'3xl'} py={{ base: 3, md: 2 }} px={3}>
                <HStack spacing={2} justifyContent="center">
                  <Icon fontSize={'2xl'} rounded={'full'} as={PolygonBadge} />
                  <Text>{`${balance.data?.formatted} ${currency}`} Staked</Text>
                </HStack>
              </Badge>
            </HStack>
          </Stack>
        </NextLink>
      </Box>
    </Box>
  );
};

const defaultContractConfig = {
  addressOrName: REGISTRY,
  question: 'Will Ijeoma leave in the next Elimination? and have Phyna remain as her best friend',
  href: routes.curator.root,
  stakingAmount: 12,
  createdAt: new Date('2022-09-21T12:38:48.915Z'),
  closedAt: new Date('2022-09-21T12:38:48.915Z'),
  contractInterface: Onuahia__factory.abi,
};

EventSummaryCard.defaultProps = { ...defaultContractConfig };
