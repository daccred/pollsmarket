import { ChakraNextImage } from '@/next';
import NextLink from 'next/link';
import { Box, chakra, Button, useColorModeValue as mode, Flex, Text, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import BbnBannerImage from '@/public/images/bbn-image-lg.png';
import routes from '@/config/routes';

interface Props {
  img: string;
  description: string;
}
interface ImageProps {
  img: string;
}

export function Banner({ img }: Props) {
  return (
    <Box rounded={'3xl'} as="section" bg={'bg-canvas'} pt={[2, 24]} pb={[0, 12]} overflow="hidden">
      <Box maxW={{ base: 'xl', md: '8xl' }} mx="auto" px={{ base: '2', md: '8' }}>
        <Flex align="flex-start" direction={{ base: 'column', lg: 'row' }} justify="space-between" mb="20">
          <Box textAlign={{ base: 'center', lg: 'left' }} flex="1" maxW={{ lg: 'xl' }} pt="6">
            <Heading as="h1" size={{ base: 'xl', md: '4xl' }} mt="8" fontWeight="extrabold">
              Put your{' '}
              <chakra.span mx={1} color="emphasized">
                {' '}
                money{' '}
              </chakra.span>
              where your mouth is!
            </Heading>
            <Text color={mode('gray.600', 'gray.400')} mt="5" fontSize="xl">
              Stake your{' '}
              <chakra.span mx={1} color="emphasized">
                {' '}
                $MATIC{' '}
              </chakra.span>
              on the outcome of real world events, like BB Naija show and predict on an outcome to win
              <chakra.span mx={1} color="emphasized">
                {' '}
                $$
              </chakra.span>{' '}
              from a stake pool.
            </Text>
            <NextLink href={routes.event.root} passHref>
              <Button mt="8" minW="14rem" colorScheme="purple" size="lg" height="14" px="8" fontSize="md" fontWeight="bold">
                Discover Events
              </Button>
            </NextLink>
          </Box>
          <Box boxSize={{ base: '4', lg: '8' }} />
          <BannerImage img={img} />
        </Flex>
        <Box textAlign={{ base: 'center', lg: 'left' }} display={{ base: 'none', md: 'block' }}>
          <Text fontWeight="medium">Choose from a pool of real world events</Text>
          <SimpleGrid
            mt="8"
            columns={{ base: 2, md: 3, lg: 6 }}
            color="gray.500"
            alignItems="center"
            spacing={{ base: '12', lg: '24' }}
            fontSize="2xl"
          >
            {/* <Logos.ChatMonkey />
          <Logos.Wakanda />
          <Logos.Lighthouse />
          <Logos.Plumtic />
          <Logos.WorkScout />
          <Logos.Finnik /> */}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}

function BannerImage({ img, ...props }: ImageProps) {
  return (
    <ChakraNextImage
      pos="relative"
      marginEnd="-16rem"
      w="50rem"
      alt="Screenshot for BBN Season 7 Housemates"
      //  w={'full'}
      src={img}
      {...props}
    />
  );
}

Banner.defaultProps = {
  img: BbnBannerImage,
  description: '',
};
