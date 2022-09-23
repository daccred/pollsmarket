import React from 'react';
import { routes } from '@/config';
import { ChakraNextLink } from '@/next';
import { HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { FaChevronRight, FaPollH } from 'react-icons/fa';

interface Props {
  icon?: any;
}

export function AddCuratorCard({ icon }: Props) {
  return (
    <HStack
      as={ChakraNextLink}
      href={routes.curator.curatorFrom}
      borderRadius={12}
      fontWeight="bold"
      color="accent"
      cursor={'pointer'}
      p={4}
      _hover={{
        opacity: 0.9,
      }}
      justifyContent="space-between"
      bg={useColorModeValue('gray', 'orange.100')}
    >
      <HStack spacing={4}>
        <Icon as={icon ?? FaPollH} fontSize={24} />
        <Text>Become a curator</Text>
      </HStack>
      <Icon as={FaChevronRight} fontSize={24} />
    </HStack>
  );
}
