import * as React from 'react';
import { Jazzicon } from '@bbnpolls/jazzicon/src/jazz';
import { WrapperEnum, Wrapper } from '@/components/partials';
import { AvatarGroup, Box, Flex, Heading, HStack, Stack, Text, useBreakpointValue, useColorModeValue as mode } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { LogoFull } from '@project/shared/src/assets';

const RariblePatternFallback = '/images/RaribleFallback.jpg';

export const View = () => {
  return (
    <Flex
      minH={{ base: 'auto', md: '100vh' }}
      bgGradient={useBreakpointValue({
        md: mode('linear-gradient(90deg, #ffffff 10%, #A8FF78 100%)', 'linear(to-r, gray.900 50%, brand.200 50%)'),
      })}
    >
      <Flex mx="auto" width="full">
        <Box w={'35%'} display={{ base: 'none', md: 'block' }}>
          <Wrapper context={WrapperEnum.CONTAIN}>
            <Flex direction="column" height="full" color="primary.900">
              <Flex align="center" h="24">
                <LogoFull h={16} asNavigator />
              </Flex>
              <Flex flex="1" align="center">
                <Stack spacing="8">
                  <Stack spacing="6">
                    <Heading size={useBreakpointValue({ md: 'lg', xl: 'xl' })}>Start issuing Credentials</Heading>
                    <Text fontSize="lg" maxW="md" fontWeight="medium">
                      Connect your wallet and discover the many ways you create soulbound connections with your tribe
                    </Text>
                  </Stack>
                  <HStack justify={'flex-start'} spacing={280}>
                    <AvatarGroup size="lg" max={useBreakpointValue({ base: 2, lg: 5 })} borderColor="on-accent">
                      <Jazzicon seed={'0xb72430b16657a7463a9dBb5d4645b3dC539B6e6b'} />
                      <Jazzicon seed={'0x626c756500000000000000000000000000000000000000000000000000000000'} />
                      <Jazzicon seed={'0xd3C18B9460E3c2529d203166c011531B4B10B7BE'} />
                      <Jazzicon seed={'0xd3C18B9460E3c2529d203166c011531B4B10B7AE'} />
                      <Jazzicon seed={'0xd3C18B9460E3c2529d203166c011531B4B20B7BE'} />
                      <Jazzicon seed={'0xd3C18B9460E3c2529d203166c011531B4B12B7BE'} />
                      <Jazzicon seed={'0xd3C18B9460E3c2529d203166c011531B4B50B7BE'} />
                      <Jazzicon seed={'0xd3C18B9460E3c2529d203166c021531B4B10B7BE'} />
                    </AvatarGroup>
                    <Text fontWeight="medium">Join 10.000+ users</Text>
                  </HStack>
                  <Stack spacing="2"></Stack>
                </Stack>
              </Flex>
            </Flex>
          </Wrapper>
        </Box>
        <Box minH={'100vh'} flex={'1'} w={'65%'} bgRepeat={'no-repeat'} bgPos={'right'} bgSize={'cover'} bgImage={RariblePatternFallback}>
          <Wrapper context={WrapperEnum.CONTAIN}>
            <Flex mt={{ base: '75%', md: '0' }} justify={{ base: 'center', md: 'flex-end' }} py={{ base: '4', md: '8' }}>
              <ConnectButton
                accountStatus={{
                  smallScreen: 'full',
                  largeScreen: 'full',
                }}
              />
            </Flex>
          </Wrapper>
        </Box>
      </Flex>
    </Flex>
  );
};

export default View;
