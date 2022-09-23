/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Link as ChakraLink, LinkProps, Button, ButtonProps, useColorModeValue, LinkOverlay, LinkBox } from '@chakra-ui/react';
import { FiArrowRightCircle } from 'react-icons/fi';
import { BsArrowRightCircleFill } from 'react-icons/bs';

type NavigationLinkProps = ButtonProps & {
  children?: string | React.ReactNode;
  href: string;
  activeProps?: LinkProps;
  _hover?: LinkProps;
};

interface ActionButtonProps extends ButtonProps {
  label: string;
  href: string;
  analyticName?: string;
  withIcon?: boolean | undefined;
}

export const FormButton: React.FC<ActionButtonProps> = (props) => {
  const { withIcon, label, ...rest } = props;
  const variant = useColorModeValue('solid', 'outline');
  return (
    <Button
      borderRadius="0"
      size="lg"
      fontWeight="700"
      variant={variant}
      alignContent="center"
      boxShadow={'2px 3px 0px'}
      minH="3rem"
      justifyContent={props.withIcon ? 'space-between' : 'center'}
      colorScheme="green"
      rightIcon={withIcon ? <FiArrowRightCircle /> : <React.Fragment />}
      width="100%"
      {...rest}
    >
      {label}
    </Button>
  );
};

export const NextLinkButton: React.FC<ActionButtonProps> = (props) => {
  const { withIcon, href, label, ...rest } = props;
  const variant = useColorModeValue('solid', 'outline');

  return (
    <Link href={href}>
      <Button
        borderRadius="md"
        size="lg"
        fontWeight="700"
        variant={variant}
        alignContent="center"
        minH="3rem"
        justifyContent={props.withIcon ? 'space-between' : 'center'}
        colorScheme="green"
        rightIcon={withIcon ? <BsArrowRightCircleFill /> : <React.Fragment />}
        width="100%"
        {...rest}
      >
        {label}
      </Button>
    </Link>
  );
};

export const ExternalLinkButton: React.FC<ActionButtonProps> = ({ withIcon, href, label, ...rest }) => {
  const variant = useColorModeValue('solid', 'outline');

  return (
    <ChakraLink isExternal href={href}>
      <Button
        size="lg"
        borderRadius="0"
        variant={variant}
        fontWeight="700"
        alignContent="center"
        boxShadow={'2px 3px 0px'}
        minH="3rem"
        justifyContent={withIcon ? 'space-between' : 'center'}
        colorScheme="green"
        rightIcon={withIcon ? <BsArrowRightCircleFill /> : <React.Fragment />}
        width="100%"
        {...rest}
      >
        {label}
      </Button>
    </ChakraLink>
  );
};

/**
 * @name NavigationLink
 * @description Navigation link that wraps next/link with chakra UI to enablestyling and
 * detect routes within pages and style accordingly.. to be used with PrimaryNav Components
 * @see https://dev.to/kennymark/implementing-activelink-in-next-js-and-chakra-44ki
 */

export function NavigationLink({ href, activeProps, children, _hover, ...props }: NavigationLinkProps & LinkProps) {
  const router = useRouter();
  // const isPath =
  const isActive = router.asPath === href ? true : router.pathname.startsWith(href);
  // const isActive = router.asPath === href;

  if (isActive) {
    return (
      <Link href={href} passHref>
        <LinkBox>
          <LinkOverlay variant="link" aria-current="page" fontWeight={'500'} _hover={{ color: 'selected' }} {...props} {...activeProps}>
            {children}
          </LinkOverlay>
        </LinkBox>
      </Link>
    );
  }

  return (
    <Link href={href} passHref>
      <ChakraLink _hover={{ color: 'selected' }} {...props}>
        {children}
      </ChakraLink>
    </Link>
  );
}

/**
 * @name ChakraNextLink
 * @description Like NavigationLink, but used within page routes and pass styling props from chakra and
 * supports style overrides
 */

export function ChakraNextLink({ href, children, _hover, ...props }: NavigationLinkProps & LinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink variant="link" fontWeight={'500'} _hover={{ color: 'selected' }} {...props}>
        {children}
      </ChakraLink>
    </Link>
  );
}
