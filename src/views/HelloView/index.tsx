import React from 'react';
import { Button, VStack, HStack, Container } from '@chakra-ui/react';
import FormInput from '@bbnpolls/forms/src/components/FormInput';
import FormInputArray from '@bbnpolls/forms/src/components/FormInputArray';
import FormRadioCard, { FormRadioCardOptionProps } from '@bbnpolls/forms/src/components/FormRadioCard';
import useForm from '@bbnpolls/forms/src/hooks/useForm';
import { QuantityPicker } from './components/QuantityPicker';
import Footer from '@/components/partials/Footer';

/* Internal card components */
import { DetailCard, EventFeatureCard, EventSummaryCard, InfoCard, ValuePropsCard, WalletCard } from '@/components/cards';
import { Banner, Wrapper, WrapperEnum } from '@/components/partials';
import { LogoFull } from '@project/shared/src/assets';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { trpc } from '@/clients/trpc';

export const PredictionForm = () => {
  const onSubmit = (data: any) => console.warn(data);

  const { renderForm } = useForm({
    onSubmit,
    defaultValues: { outcomes: ['_'] },
  });

  const formRadioCardOptions: FormRadioCardOptionProps[] = [
    {
      name: 'Bella is a super lengthy outcome text that we think can extend even further more',
      metadata: 245,
      value: '8ed1d5aff6eb5d05cc5638764366d28f',
    },
    {
      name: 'Sheggz',
      metadata: 245,
      value: '17beacef0dada2c65b027cd350e8bd',
    },
    {
      name: 'Groovy',
      metadata: 245,
      value: '8ed1d5aff6eb5d05c638764366d28f',
    },
  ];

  return renderForm(
    <VStack align={'flex-start'} spacing={4}>
      <FormRadioCard direction={'row'} label="Outcomes" name="radio" options={formRadioCardOptions} />

      <QuantityPicker rootProps={{ maxW: 'full' }} defaultValue={1} max={10} />
      <FormInput type="tel" label="Amount to Stake" name="amount" />
      <FormInputArray limit={3} addMoreText={'Add more Outcomes'} label="Add Outcomes" name="outcomes" />
      <ul>
        <li>Available balance: 8999 MATIC</li>
        <li>Maximum Winnings: 8999 MATIC</li>
      </ul>

      <Button
        w={'full'}
        colorScheme={'orange'}
        type="submit"
        // isLoading={updateSetting.isLoading}
      >
        Stake Matic
      </Button>
    </VStack>
  );
};

export default function View() {
  const markets = trpc.useQuery(['market.getMarketRange', { offset: 0, limit: 10 }]);
  console.warn(markets);

  return (
    <Wrapper context={WrapperEnum.CONTAIN}>
      <HStack justifyContent={'space-between'}>
        <LogoFull h={12} />
        <ConnectButton
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </HStack>
      <Banner />

      <Container maxW="lg">
        <div>Choose an Outcome</div>
        <Footer />
        <WalletCard />
        <ValuePropsCard />
        <EventFeatureCard />
        <DetailCard variant="simple" />
        <InfoCard />
      </Container>

      <EventSummaryCard {...({} as any)} />
    </Wrapper>
  );
}
