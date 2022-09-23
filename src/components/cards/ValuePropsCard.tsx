import React from 'react';
import { CalendarIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Stack, useColorModeValue, Text, HStack, Avatar, Flex, Icon, AvatarGroup, Button } from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';
import { ChakraNextLink } from '@/next';

interface Props {
  isNew: boolean;
  link?: string;
  eventsNo: number;
}

export function ValuePropsCard({ isNew, eventsNo, link }: Props) {
  const color = useColorModeValue('black', 'white');
  const bg = useColorModeValue('gray', 'gray.600');
  return (
    <Stack as={ChakraNextLink} href={link ?? '#'} color={color} bg={bg} p="1rem" borderRadius={12} mt="2rem" spacing={6}>
      <Text>{isNew ? 'New Event' : 'Curate Event'}</Text>
      {isNew ? (
        <Flex width="full" justifyContent={'space-between'} alignItems="center">
          <CalendarIcon fontSize="2rem" />
          <Button variant={'link'} size="sm">
            <HStack cursor={'pointer'}>
              <Text>Add New</Text>
              <Icon as={BsPlus} fontSize="2rem" />
            </HStack>
          </Button>
        </Flex>
      ) : (
        <Events eventsNo={eventsNo} link={link} />
      )}
    </Stack>
  );
}

interface EventProps {
  eventsNo: number;
  link?: string;
}
function Events({ eventsNo }: EventProps) {
  return (
    <Flex alignItems={'center'} justifyContent="space-between" width="full">
      <HStack>
        <AvatarGroup size="sm" max={3}>
          {Array(eventsNo)
            .fill(1)
            .map((event, index) => (
              <Avatar key={index} name="Kwaku Ananse" />
            ))}
        </AvatarGroup>
        <Text>{eventsNo} of events</Text>
      </HStack>
      <Button variant={'link'} size="sm">
        <HStack cursor={'pointer'} justifyContent="space-between">
          <Text>Proceed</Text>
          <Icon as={ChevronRightIcon} fontSize="2rem" />
        </HStack>
      </Button>
    </Flex>
  );
}

ValuePropsCard.defaultProps = {
  isNew: false,
  eventsNo: 5,
};
