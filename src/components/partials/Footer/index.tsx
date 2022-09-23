import { RelativeDarkModeSwitch } from '@/components/core/DarkModeSwitch';
import { socialIcons } from '@/data';
import { ChakraNextLink } from '@/next';
import { Flex, HStack, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { LogoFull } from '@project/shared/src/assets';
import React from 'react';

interface Props {
  description: any;
  icons: typeof socialIcons;
}

export default function Footer({ icons, description }: Props) {
  const color = useColorModeValue('black', 'white');
  // const border = useColorModeValue('light', 'dark');
  return (
    <Stack spacing="4" py={{ base: 4, md: 8 }} maxW="25rem">
      <LogoFull />
      <Text color={color}>{description}</Text>
      <Flex justifyContent={'space-between'} alignItems={'center'} width="100%">
        <HStack
          color="orange.300"
          // width={'full'}
          // px="1rem"
          py="0.5rem"
          spacing="2.5rem"
          // border={border}
          borderRadius={8}
        >
          {icons.map((icon, index) => (
            <ChakraNextLink key={index} href={icon.link}>
              <Icon as={icon.icon} fontSize="2.5rem" />
            </ChakraNextLink>
          ))}
        </HStack>
        <RelativeDarkModeSwitch />
      </Flex>
      <Text pt={12} textAlign={'center'}>
        BBN Poll {new Date().getFullYear()}. All Rights Reserved
      </Text>
    </Stack>
  );
}

Footer.defaultProps = {
  description:
    'BBN Poll is a platform where you can stake money on events in the BB Naija show and predict on an outcome to win from a stake pool.',
  icons: socialIcons,
};
