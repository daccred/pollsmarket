import * as React from 'react';
import { reduce, isEmpty } from 'lodash';
import { Onuahia__factory } from '@bbnpolls/chain/types';
import { Box, Stack } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/progress';
import { useContractReads } from 'wagmi';
import { ProgressSkeleton } from '@/components/core';
import { ContractInterface } from 'ethers';
import { parseBytes32String, formatUnits } from 'ethers/lib/utils';

export type PredictionMarketConf = {
  name: string;
  value: string;
  addressOrName: string;
  functionName: string;
  args: string[];
  contractInterface: ContractInterface;
  /** These keys arent readily available in the parent */
  count?: number;
  isResolution?: number;
};

export interface EventOutcomeProps {
  outcomes: PredictionMarketConf[];
}

const transformer = (data: any[]) => {
  const stakes: number = reduce(data, (acc, val) => acc + parseInt(formatUnits(val.count, 0)), 0);

  const payload = data.map((val) => ({
    /** count is not a percentage of total stakes  */
    count: (parseInt(formatUnits(val.count, 0)) / stakes) * 100 || 0,
    value: val.hash,
    isResolution: val.count == 1 ? true : false,
    /** we convert the hash to a readable string */
    name: parseBytes32String(val.hash),
  }));

  /* We have to return this format because of useContractRead result type */
  return [stakes, payload];
};

export default function EventOutcomeStack({ outcomes }: EventOutcomeProps) {
  const { data, isError, isLoading } = useContractReads({
    contracts: [...outcomes],
    watch: false,
    select: (data) => transformer(data) as any,
  });

  if (isLoading || isEmpty(outcomes)) {
    return <ProgressSkeleton />;
  }
  if (isError) {
    return <React.Fragment />;
  }

  return (
    <Stack>
      {data &&
        data[1].map(({ name, count, value }) => (
          <Stack key={value} position={'relative'} color={'blend'}>
            <Box
              noOfLines={[1, 2]}
              fontWeight={'medium'}
              as="p"
              rounded={'lg'}
              position={'absolute'}
              zIndex={5}
              left={'2%'}
              mixBlendMode={'difference'}
              top={{ base: 'calc(25px /2)', md: 'calc(36px /2)' }}
            >
              {name}
            </Box>
            <Box fontWeight={'bold'} as="p" color={'inverted'} position={'absolute'} zIndex={5} right={'2%'} top={'20%'}>
              {/* We want to output % as a betting standard1 */}
              {`${parseInt(count)}%`}
            </Box>
            <Progress hasStripe height={{ base: 8, md: 10 }} value={parseInt(count)} />
          </Stack>
        ))}
    </Stack>
  );
}

const outcomes: PredictionMarketConf[] = [
  {
    value: 'Q0E7QUFD ',
    count: 50,
    name: 'Midnight',
    isResolution: 0,
    addressOrName: '0x',
    contractInterface: Onuahia__factory.abi,
    functionName: 'predictions',
    args: ['value'],
  },
  {
    value: 'kMGQ2MzU',
    count: 40,
    name: 'Wednesday',
    isResolution: 0,
    addressOrName: '0x',
    contractInterface: Onuahia__factory.abi,
    functionName: 'predictions',
    args: ['value'],
  },
];
EventOutcomeStack.defaultProps = { outcomes };
