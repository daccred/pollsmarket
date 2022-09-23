import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  HStack,
  CircularProgress,
  Box,
  Stack,
  useToast,
  CircularProgressLabel,
  Icon,
} from '@chakra-ui/react';
import { BsCheckLg } from 'react-icons/bs';

interface Props {
  onClose: () => void;
  onCompleteHook: (d: any) => void;
  contractFunc: string;
  contractAddress: string;
  contractInterface: ContractInterface;
  callValues: any[];
  isOpen: boolean;
  isLoading?: boolean;
}

import { useAccount } from 'wagmi';
/*  */
import { REGISTRY } from '@/config';
import { Akwukwo__factory } from '@bbnpolls/chain/types';
import { useContractEvent, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { ContractInterface } from 'ethers';

export function TransactionModal({ contractAddress, contractInterface, contractFunc, onClose, isOpen, onCompleteHook, callValues }: Props) {
  const account = useAccount();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [callResponse, setCallResponse] = useState<any>();
  const toast = useToast();



  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: contractInterface,
    functionName: contractFunc,
    args: callValues,
    enabled: false,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const callContract = useContractWrite({
    ...config,
    mode: 'recklesslyUnprepared',
    onSettled(data, error) {
      if (error) {
        setErrorMsg(error.message || (error.cause as any).toString() || 'Operation Failed');
        onClose();
      } else {
        // transaction.refetch();
        setCallResponse(data);
      }
    },
  });

  // const transaction = useWaitForTransaction({
  //     wait: callContract.data?.wait,
  //     hash: callContract.data?.hash,
  //     enabled: false,
  //     onError(error) {
  //         setErrorMsg(error.message || (error.cause as any).toString() ||  'Operation Failed')
  //     },
  //     onSuccess(data) {
  //         setCallResponse(data)
  //     }
  // });

  useContractEvent({
    addressOrName: REGISTRY,
    contractInterface: Akwukwo__factory.abi,
    eventName: 'Market',
    listener: (event) => {
      /* only invoke callback if this event is from this transaction */
      if (event[2] === account.address && event[1] === callValues[0]) {
        onCompleteHook({ callResponse, event, enabled: true });
        onClose();
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      callContract.write?.();
    }
    return () => {
      callContract.reset();
    };
  }, [isOpen, callValues]);

  useEffect(() => {
    errorMsg &&
      toast({
        title: errorMsg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
  }, [errorMsg]);

  return (
    <Modal returnFocusOnClose isCentered blockScrollOnMount isOpen={isOpen} onClose={onClose} size={'md'} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent mx={4} bg={'bg-canvas'} rounded={'3xl'} textAlign={'left'}>
        <ModalHeader my={0} fontSize={'xl'}>
          {'Completing Transaction'}
        </ModalHeader>
        <ModalCloseButton disabled={callContract.isLoading} mt={1.5} />
        <ModalBody mt={0} pt={0}>
          <Stack spacing="1.5rem">
            <Text opacity={0.8}>{'We are processing your request'}</Text>

            <HStack py={4}>
              <CircularProgress isIndeterminate={true} value={50} color={`yellow.400`} trackColor="white">
                <CircularProgressLabel pt="0.3rem">
                  <Icon as={BsCheckLg} color="yellow.400" fontSize={'1.3rem'} />
                </CircularProgressLabel>
              </CircularProgress>
              <Box width="90%">
                <Text color={'emphasized'}>{'Authorizing this transaction from your blockchain wallet'}</Text>
              </Box>
            </HStack>
          </Stack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
