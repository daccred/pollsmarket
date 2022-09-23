import React, { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import useForm from '@bbnpolls/forms/src/hooks/useForm';
import { Button, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import FormInput from '@bbnpolls/forms/src/components/FormInput';
import FormInputArray from '@bbnpolls/forms/src/components/FormInputArray';
import FormTextArea from '@bbnpolls/forms/src/components/FormTextarea';
import FormCheckbox from '@bbnpolls/forms/src/components/FormCheckbox';
import FormDateInput from '@bbnpolls/forms/src/components/FormDateInput';

import { useAccount } from 'wagmi';
/*  */
import { REGISTRY, routes } from '@/config';
import { trpc } from '@/clients/trpc';
import { Akwukwo__factory } from '@bbnpolls/chain/types';

import Model, { FormHandleCompleteOptions, FormInputRequest } from './_schema';
import { TransactionModal } from './TransactionModal';
import { useRouter } from 'next/router';

export default function CreateMarketForm() {
  // const [configParams, setConfigParams] = React.useState<any>([])
  const mutation = trpc.useMutation(['market.createMarket']);

  const account = useAccount();
  const router = useRouter();

  const [callParams, setCallParams] = useState<any>([]);
  const [apiArg, setApiArg] = useState<any>();
  const [apiResponse, setApiResponse] = useState<any>();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleSubmit = async (data: FormInputRequest) => {
    data['curator'] = account.address as string;
    const schema = new Model(data);

    const callValues = schema.prepareValuesForContract();

    setCallParams(callValues);
    setApiArg(data);

    /* Pop open the transaction modal */
    onOpen();
  };

  const handleComplete = async (data: FormHandleCompleteOptions) => {
    console.warn({ ...data, ...apiArg });
    try {
      const payload = await Model.prepareValuesForTrpc({ ...apiArg, ...data });
      const result = await mutation.mutateAsync(payload);
      setApiResponse(result);
    } catch (error) {
      console.error(error);
    }
  };

  const { renderForm, control } = useForm<FormInputRequest>({
    onSubmit: handleSubmit,
    defaultValues: Model.formDefaultValues,
    schema: Model.validationSchema,
  });

  /* Watch form values from react context */
  const { limitMaxTicketSupply } = useWatch({
    control,
  });

  useEffect(() => {
    if (apiResponse) {
      router.push(routes.curator.root);
    }
  }, [apiResponse]);

  return renderForm(
    <Stack spacing={6} mt={12}>
      <TransactionModal
        contractFunc={'deployOnuahia'}
        contractAddress={REGISTRY}
        contractInterface={Akwukwo__factory.abi}
        onCompleteHook={handleComplete}
        callValues={callParams}
        isOpen={isOpen}
        onClose={onClose}
      />
      <FormTextArea name="question" label="Question" type="text" />
      <HStack minH={'62px'} align={'flex-start'}>
        <FormInput type="number" name="stakingAmount" label="Amount ($MATIC)" />
        <FormDateInput name="eventDeadline" label="Event deadline" />
      </HStack>
      <HStack minH={'62px'} align={'flex-start'}>
        <FormDateInput name="resolutionTime" label="Resolution Time" />
        <FormInput isDisabled={!limitMaxTicketSupply} name="maxTicketSupply" type="string" label="Max Ticket Supply" />
      </HStack>

      <FormCheckbox label="Limit ticket supply" name="limitMaxTicketSupply" />
      <FormInputArray limit={4} addMoreText={'Add more Outcomes'} label="Event Outcomes" name="eventOutcomes" />

      <FormTextArea placeholder={'DSTV website'} name="resolutionSource" label="Resolution Source" />

      <FormInput name="resolutionLink" type="url" label="Resolution link" />
      <Button isLoading={mutation.isLoading} colorScheme={'orange'} type="submit" fontSize={'lg'} fontWeight="medium">
        Publish Event
      </Button>
    </Stack>
  );
}
