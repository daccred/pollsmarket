import * as React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button, ButtonGroup, Center, Flex, HStack, useBreakpointValue } from '@chakra-ui/react';
import { LogoFull } from '@project/shared/src/assets';
import { NavigationLink } from '@/next/Link';
import { Wrapper, WrapperEnum } from '@/components/partials';

const menu = [
  {
    name: 'Events',
    href: '/discover',
  },
  {
    name: 'Prediction',
    href: '/predictions',
  },
  {
    name: 'Curator',
    href: '/curator',
  },
  {
    name: 'Account',
    href: '/account',
  },
];

export const TopNavigation = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Wrapper context={WrapperEnum.CONTAIN}>
      <Box position={'relative'} as="nav" pb={{ base: 6, md: 12 }} pt={{ base: 4, md: 6 }}>
        <HStack justify="space-between">
          <Box w={{ base: '60%', md: '40%', xl: '30%' }}>
            <LogoFull asNavigator />
          </Box>
          {isDesktop ? (
            <Box as={Center} w={{ base: '50%', xl: '40%', '2xl': '40%' }}>
              <Flex as={Center} w={'max-content'} border={'primary'} p={{ base: 2, md: 2, xl: 1 }} rounded={'2xl'} justify="space-between">
                <ButtonGroup variant="ghost" rounded={'2xl'} size={'sm'} spacing="8">
                  {menu.map((item) => (
                    <Button as={NavigationLink} key={item.name} href={item.href} activeProps={{ bg: 'inherit' }}>
                      {item.name}
                    </Button>
                  ))}
                </ButtonGroup>
              </Flex>
            </Box>
          ) : (
            <React.Fragment />
          )}
          <Flex justify={'flex-end'} w={{ base: 'inherit', md: '60%', xl: '45%', '2xl': '30%' }}>
            <ConnectButton
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
          </Flex>
        </HStack>
      </Box>
    </Wrapper>
  );
};
