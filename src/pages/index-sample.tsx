/* eslint-disable no-console */
import React, { useEffect } from 'react';
import View from '@/views/HelloView';

/* Page components */
import { Meta } from '@/next/index';
import { NextPageLayout } from '@/components/partials';

import {
  useContract,
  useProvider,
  useNetwork,
  useContractEvent,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
  useContractInfiniteReads,
  paginatedIndexesConfig,
} from 'wagmi';
import { Akwukwo__factory } from '@bbnpolls/chain/types';
import { REGISTRY } from '@/config';
import { moralis } from '@/clients/moralis';
import { Button } from '@chakra-ui/react';
import { ethers } from 'ethers';

const outcome_stud = [
  '0x4d69646e69676874000000000000000000000000000000000000000000000000',
  '0x5765656b656e6400000000000000000000000000000000000000000000000000',
  '0x4e6f6f6e00000000000000000000000000000000000000000000000000000000',
];

/* We always export pages as PAGE */
export default function Page() {
  const provider = useProvider();
  const account = useAccount();
  const network = useNetwork();

  console.warn(network, network.chain?.id, 'CHAIN INFORMATION');

  const contract = useContract({
    addressOrName: REGISTRY,
    contractInterface: Akwukwo__factory.abi,
    signerOrProvider: provider,
  });

  const { data, isError, isLoading } = useContractRead({
    addressOrName: REGISTRY,
    contractInterface: Akwukwo__factory.abi,
    functionName: 'authority',
    chainId: network.chain?.id,
    // watch: true,
    onError(error) {
      console.error('Error', error);
    },
    onSettled(data, error) {
      console.log('Contract Read Settled', { data, error });
    },
  });
  const fee = ethers.utils.parseEther('0.1');

  console.log(moralis.ralis.EvmApi.nft.getContractNFTs(), { fee });

  console.log(data, isError, isLoading, '>>> <<< CONSOLE DATA');

  useEffect(() => {
    console.log(contract, data, isError, isLoading, '>>> EFFECT CONSOLE DATA');
    console.log(JSON.stringify(contract), ' Write out>>> <<< CONSOLE DATA');
  }, []);

  // deployOnuahia(string,string,address,bytes32[],fee:uint256,supply:uint256,expiry:uint64)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const abi = new ethers.utils.Interface(Akwukwo__factory.abi);
  const { config } = usePrepareContractWrite({
    addressOrName: REGISTRY,
    contractInterface: Akwukwo__factory.abi,
    functionName: 'deployOnuahia',
    args: ['Will ijeoma stay the house next week', 'WILJH', account.address, outcome_stud, fee, 10, 1665409665000],
  });
  const {
    data: writeData,
    isLoading: writeLoading,
    isSuccess: writeSuccess,
    write,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Contract Write Set', 'fee:', fee, { data, error });
    },
  });

  const contractConfig = {
    addressOrName: REGISTRY,
    contractInterface: Akwukwo__factory.abi,
  };

  const {
    data: infinteData,
    fetchNextPage,
    isLoading: isInfiniteLoading,
  } = useContractInfiniteReads({
    cacheKey: 'deployedMarkets',
    suspense: true,
    ...paginatedIndexesConfig(
      (index) => ({
        ...contractConfig,
        functionName: 'markets',
        args: [index],
      }),
      { start: 0, perPage: 10, direction: 'increment' }
    ),
  });

  console.warn({ infinteData, fetchNextPage });

  useContractEvent({
    addressOrName: REGISTRY,
    contractInterface: Akwukwo__factory.abi,
    eventName: 'Market',
    listener: (event) => console.log(event, 'event logged <><><><'),
  });

  if (!infinteData && isInfiniteLoading) {
    return <div>Loading</div>;
  }

  console.log({ writeData, writeLoading, writeSuccess }, 'Write Market deployment');
  return (
    <React.Fragment>
      <Button
        onClick={() =>
          write?.({
            recklesslySetUnpreparedArgs: ['When do we begin', 'WILJH', account.address, outcome_stud, fee, 10, 1665409665000],
          })
        }
      >
        Create Market
      </Button>
      <Meta />
      <View />
    </React.Fragment>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <NextPageLayout>{page}</NextPageLayout>;
};
