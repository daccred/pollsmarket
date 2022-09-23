import * as React from 'react';
import { Box, Button, ButtonGroup, Center, Container, HStack, Icon, useBreakpointValue, VStack } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
// import { HiOutlineRectangleStack } from 'react-icons/hi';
import { BiLibrary } from 'react-icons/bi';
import { IoTrophyOutline } from 'react-icons/io5';
import { NavigationLink } from '@/next/Link';
import Footer from '../Footer';

const menu = [
  {
    name: 'Events',
    href: '/discover',
    icon: FiHome,
  },
  {
    name: 'Prediction',
    href: '/predictions',
    icon: BiLibrary,
    // icon: HiOutlineRectangleStack,
  },
  {
    name: 'Curator',
    href: '/curator',
    icon: IoTrophyOutline,
  },
  {
    name: 'Account',
    href: '/account',
    icon: BiUserCircle,
  },
];

export const BottomNavigation = () => {
  ///@todo we will combine this with a useAuthUser hook
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return !isDesktop ? (
    <Box
      bg={'bg-canvas'}
      position={'fixed'}
      zIndex={9}
      bottom={0}
      as="section"
      pt={{ base: 2, md: '3' }}
      borderTop={'1px solid'}
      borderColor={'bg-muted'}
      w={'full'}
    >
      <Box as="nav">
        <Container maxW={'lg'} w={'100vw'} py={{ base: 1, lg: 1 }} pb={[2]}>
          <HStack justify="center" align={'center'}>
            <ButtonGroup w={'full'} justifyContent={'space-around'} variant="link" spacing="8">
              {menu.map((item) => (
                <VStack as={NavigationLink} href={item.href} cursor={'pointer'} key={item.name} activeProps={{ color: 'orange.200' }}>
                  <Icon fontSize={'lg'} aria-label={item.name} as={item.icon} color={'inherit'} />
                  <Button size={'xs'} color={'inherit'}>
                    {item.name}
                  </Button>
                </VStack>
              ))}
            </ButtonGroup>
          </HStack>
        </Container>
      </Box>
    </Box>
  ) : (
    <Center>
      <Footer />
    </Center>
  );
};
