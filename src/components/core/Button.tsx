import { Button, ButtonProps, Text, useColorModeValue as mode } from '@chakra-ui/react';
import React from 'react';

export function GradButton({ title, ...rest }: ButtonProps) {
  return (
    <Button
      color={mode('brand.900', 'whiteAlpha.900')}
      bgGradient={'linear(to-r, #78FFD6, #A8FF78)'}
      _hover={{ bgGradient: 'linear(to-l, #78FFD6, #A8FF78)' }}
      width="100%"
      transition="all 0.2s"
      {...rest}
    >
      {title}
    </Button>
  );
}

export function GradTextButton({ title, ...rest }: ButtonProps) {
  return (
    <Button bg={mode('brand.900', 'whiteAlpha.900')} _hover={{ bg: 'black' }} {...rest}>
      <Text
        bgClip={'text'}
        py="2rem"
        bgGradient={'linear(to-r, #78FFD6, #A8FF78)'}
        _hover={{ bgGradient: 'linear(to-l, #78FFD6, #A8FF78)' }}
      >
        {title}
      </Text>
    </Button>
  );
}

export function UserButton({ title, ...rest }: ButtonProps) {
  return (
    <Button lef color="black" bg="white" borderRadius={10} border="3px solid black" {...rest}>
      {title}
    </Button>
  );
}
