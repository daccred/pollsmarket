import { ArrowBackIcon } from '@chakra-ui/icons';
import { Heading, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type BackRouterProps = {
  title: string;
};

export const BackRouter: React.FC<BackRouterProps> = ({ title }) => {
  const router = useRouter();
  return (
    <HStack color={useColorModeValue('black', 'white')} _hover={{ cursor: 'pointer', color: 'orange.200' }} onClick={() => router.back()}>
      <Icon as={ArrowBackIcon} fontSize={24} />
      <Heading size={'xs'}>{title}</Heading>
    </HStack>
  );
};
