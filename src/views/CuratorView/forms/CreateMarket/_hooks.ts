import { REGISTRY } from '@/config';
import { trpc } from '@/clients/trpc';
import { Akwukwo__factory } from '@bbnpolls/chain/types';
import { useNetwork, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { ForContractProps } from './_schema';

// const { toast } = useTransactionToast()
// const { toast } = useRequestToast()
// toast({
//     title: errorMessage,
//     status: 'error',
//     duration: 5000,
//     isClosable: true,
// });
export function useCurateFormRequest() {
  const network = useNetwork();
  const mutate = trpc.useMutation(['market.createMarket']);

  const _prepare = (input: ForContractProps) => {
    return usePrepareContractWrite({
      addressOrName: REGISTRY,
      contractInterface: Akwukwo__factory.abi,
      chainId: network.chain?.id,
      functionName: 'deployOnuahia',
      args: input,
      enabled: false,
    });
  };

  type TPrepare = ReturnType<typeof _prepare>;

  const _callContract = (prepare: TPrepare) => {
    return useContractWrite({
      ...prepare.config,
      onSettled(data, error) {
        console.warn('Contract Write Set', { data, error });
      },
    });
  };

  return {
    mutate,
    prepareCall: _prepare,
    callContract: _callContract,
  };
}
