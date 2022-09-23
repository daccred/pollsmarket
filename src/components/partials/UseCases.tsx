import { Box, Container, Heading, Image, Stack, Text, useBreakpointValue, useColorMode, useColorModeValue } from '@chakra-ui/react';

export const UseCases = () => {
  const { colorMode } = useColorMode();
  return (
    <Box as="section">
      <Box bg="bg-accent" color="on-accent">
        <Container pt={{ base: '16', md: '24' }} pb={{ base: '28', md: '40' }}>
          <Stack spacing={{ base: '8', md: '10' }} align="center">
            <Stack spacing={{ base: '4', md: '5' }} textAlign="center">
              <Stack spacing="3">
                <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="semibold" color="blue.50">
                  Features
                </Text>
                <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Create accessible React apps with speed</Heading>
              </Stack>
              <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="2xl" color="on-accent-muted">
                Candy canes tiramisu bear claw carrot cake chupa chups. Jujubes marzipan lemon drops gummi bears tiramisu pastry liquorice.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box bg="bg-surface">
        <Container>
          <Box
            transform={{ base: 'translateY(-64px)', md: 'translateY(-96px)' }}
            borderRadius="xl"
            overflow="hidden"
            boxShadow={useColorModeValue('xl', 'xl-dark')}
          >
            <picture>
              <source srcSet={`/screenshots/showcase/neutral/480-${colorMode}.png`} media="(max-width: 40em)" />
              <source srcSet={`/screenshots/showcase/neutral/768-${colorMode}.png`} media="(max-width: 62em)" />
              <Image alt="Feature Hero Image" src={`/screenshots/showcase/neutral/1440-${colorMode}.png`} objectFit="cover" />
            </picture>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
