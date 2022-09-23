import { BoxProps } from '@chakra-ui/react';

export enum WrapperEnum {
  FLUID = 'fluid',
  INNER = 'inner',
  CONTAIN = 'contain',
  MOBILE = 'mobile',
}

/* Used to define the various box styles we'd use for Inner Wrappers */
export type InnerWrapperStyleVariant = 'default' | 'boxed' | 'retro' | 'compact' | 'form' | 'form-retro' | 'form-boxed';

export interface WrapperInnerProps extends BoxProps {
  variant?: InnerWrapperStyleVariant;
  children: React.ReactNode;
}
