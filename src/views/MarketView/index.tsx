import React, { useState } from 'react';
import { Wrapper, WrapperEnum } from '@/components/partials';
import { QueryMarketOutput } from '@/schema/market.schema';
import { Stack, VStack, Button } from '@chakra-ui/react';
import { formatEther } from 'ethers/lib/utils';
import useForm from '@bbnpolls/forms/src/hooks/useForm';
import FormQuantityPicker from '@bbnpolls/forms/src/components/FormQuantityPicker';
import FormRadioCard from '@bbnpolls/forms/src/components/FormRadioCard';

/* Internal card components */
import { DetailCard, InfoCard } from '@/components/cards';

interface ViewProps {
  data: QueryMarketOutput;
}

/*  */
import { Onuahia__factory } from '@bbnpolls/chain/types';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';

const View = (props: ViewProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_errorMsg, setErrorMsg] = useState<string>();

  const { closedAt, createdAt, question, fee, outcomes, curator, contractAddress, resolutionSource, resolutionTime, resolutionLink } =
    props.data;

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: Onuahia__factory.abi,
    functionName: 'stake',
    args: [outcomes[0].value, 0],
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
      } else {
        console.warn(data);
      }
    },
  });

  const onSubmit = (data: any) => {
    console.warn(data);
    callContract.write?.({
      recklesslySetUnpreparedArgs: [data.prediction, data.quantity],
    });
  };

  const { renderForm, control } = useForm({
    onSubmit,
    defaultValues: {
      quantity: 1,
    },
  });

  return renderForm(
    <Wrapper context={WrapperEnum.MOBILE}>
      <Stack spacing={8}>
        {/* --------- Card with actions to make about prediction --------- */}
        <DetailCard
          question={question}
          closedAt={new Date(closedAt).toUTCString()}
          createdAt={new Date(createdAt).toUTCString()}
          fee={formatEther(fee as any) as any}
          variant="filled"
        />
        {/* --------- Card with actions to make about prediction --------- */}

        <VStack align={'flex-start'} spacing={4}>
          <FormRadioCard direction={'row'} label="Outcomes" name="prediction" options={outcomes} />

          <FormQuantityPicker control={control} required={true} name={'quantity'} rootProps={{ maxW: 'full' }} defaultValue={1} max={10} />
          {/* @TODO need to enrich this section with data  */}
          {/* <chakra.ul>
            <chakra.li>Available Tokens: 8999 MATIC</chakra.li>
            <chakra.li>Maximum Winnings: 8999 MATIC</chakra.li>
          </chakra.ul> */}
          <Button
            // isLoading={mutation.isLoading}
            w={'full'}
            colorScheme={'orange'}
            type="submit"
            fontSize={'lg'}
            fontWeight="medium"
          >
            Stake Matic
          </Button>
        </VStack>

        {/* ----------- The Prediction Info cards Line up ------------ */}
        <InfoCard
          source={resolutionSource}
          link={resolutionLink}
          time={new Date(resolutionTime).toUTCString()}
          deployer={curator}
          resolver={contractAddress}
        />
        {/* ----------- The Prediction Info cards Line up ------------ */}
      </Stack>
    </Wrapper>
  );
};

export default View;
