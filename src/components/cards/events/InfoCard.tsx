import React from 'react';
import { ChakraNextLink } from '@/next';
import { useNetwork } from 'wagmi';
import { Stack, useColorModeValue, Text, Button, HStack } from '@chakra-ui/react';
import { OpenSeaIcon } from '@project/shared/src/assets';

interface Props {
  source: string;
  link: string;
  time: string;
  deployer: string;
  resolver: string;
}

export function InfoCard({ source, link, time, deployer, resolver }: Props) {
  const bg = useColorModeValue('gray', 'gray.600');
  const network = useNetwork();
  // const color = useColorModeValue('black', 'gray.300');

  return (
    <Stack spacing="2rem">
      <Stack border="card" bg={bg} borderRadius={12} p="1rem">
        <Text as="strong" fontSize={'lg'} color={'muted'}>
          Resolution Source:
        </Text>
        <Text color="orange.100">{source}</Text>
        <HStack align={'flex-start'}>
          <Text as="strong" color={'muted'}>
            Link:
          </Text>
          <ChakraNextLink noOfLines={1} isExternal href={link} color="orange.200">
            {` ${link}`}
          </ChakraNextLink>
        </HStack>
      </Stack>
      <Stack border="card" bg={bg} borderRadius={12} p="1rem" color={'muted'}>
        <HStack align={'flex-start'}>
          <Text as={'strong'}>Resolution Time:</Text>
          <Text as="span" color="orange.100">
            {time}
          </Text>
        </HStack>
      </Stack>
      <Stack border="card" bg={bg} borderRadius={12} p="1rem" color={'muted'}>
        <HStack align={'flex-start'}>
          <Text as={'strong'}>Curator:</Text>
          <Text noOfLines={1} color="orange.100">
            {deployer}
          </Text>
        </HStack>
      </Stack>
      <Stack border="card" bg={bg} borderRadius={12} p="1rem" color={'muted'}>
        <HStack align={'flex-start'}>
          <Text as={'strong'}>Resolver:</Text>

          <ChakraNextLink color="orange.100" href={`${network.chain?.blockExplorers?.default}/nft/${resolver}`}>
            View Contract
          </ChakraNextLink>
        </HStack>
      </Stack>
      <Button
        fontSize={'lg'}
        boxShadow={'sm'}
        rounded={'xl'}
        minH={'56px'}
        as="a"
        bg="blue.400"
        rightIcon={<OpenSeaIcon bg="blue.400" h={8} fill="blue.400" rounded={'full'} />}
      >
        Checkout NFT on OpenSea
      </Button>
    </Stack>
  );
}

InfoCard.defaultProps = {
  source: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue pretium adipiscing leo, sed ultrices tellus euismod.',
  link: 'https://www.dstv.com/africamagic/en-ng/home',
  time: 'Sunday 21 August 2022',
  deployer: '0x4b24b1b119fd23aD723A2C22860...',
  resolver: '#',
};
