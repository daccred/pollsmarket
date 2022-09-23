import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Stack, useColorModeValue } from '@chakra-ui/react';
import FormInput from '@bbnpolls/forms/src/components/FormInput';
import FormSelect from '@bbnpolls/forms/src/components/FormSelect';
import FormNativeSelect from '@bbnpolls/forms/src/components/FormNativeSelect';
import FormUpload from '@bbnpolls/forms/src/components/FormUpload';

// enum IDTYPE {
//     NATIONAL = 'National ID',
// }

interface CuratorFormProp {
  idType: string;
  upload: File;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  twitter: string;
  country: string;
  state: string;
  address: string;
  polygonWallet: string;
}

export function CuratorForm() {
  const methods = useForm<CuratorFormProp>();
  const onSubmit = (data: CuratorFormProp | any) => console.warn(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <FormNativeSelect
            label="Means of Identificaton"
            name="idType"
            options={[
              { value: 'country_id', label: 'National ID' },
              { value: 'passport', label: 'Passport' },
            ]}
          />
          <FormUpload name="idUpload" />
          <FormInput name="upload" type="file" label="Upload ID" labelProps={{ color: useColorModeValue('black', 'white') }} />
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Enter first name ..."
            labelProps={{ color: useColorModeValue('black', 'white') }}
          />
          <FormInput
            name="last"
            label="Last Names"
            placeholder="Enter last name ..."
            labelProps={{ color: useColorModeValue('black', 'white') }}
          />{' '}
          <FormInput
            name="phone"
            label="Phone Number"
            placeholder="Enter phone number ..."
            labelProps={{ color: useColorModeValue('black', 'white') }}
          />{' '}
          <FormInput
            name="email"
            label="Email Address"
            placeholder="Enter first name ..."
            labelProps={{ color: useColorModeValue('black', 'white') }}
          />{' '}
          <FormInput
            name="twitter"
            label="Twitter handle"
            placeholder="Enter twitter handle ..."
            labelProps={{ color: useColorModeValue('black', 'white') }}
          />
          <FormSelect
            label="Select country"
            name="country"
            options={[
              { value: 'gh', label: 'Ghana' },
              { value: 'ng', label: 'Nigeria' },
            ]}
          />
          <FormNativeSelect
            label="Select country"
            name="country"
            options={[
              { value: 'gh', label: 'Ghana' },
              { value: 'ng', label: 'Nigeria' },
            ]}
          />
          <FormNativeSelect
            label="Select state"
            name="countryState"
            options={[
              { value: 'acc', label: 'Accra' },
              { value: 'abu', label: 'Abuja' },
            ]}
          />
          <FormInput
            name="address"
            label="Residential address"
            placeholder="Enter address ..."
            labelProps={{ color: useColorModeValue('black', 'white') }}
          />{' '}
          <FormInput
            name="polygonWallet"
            label="Polygon wallet address"
            placeholder="Enter wallet address ..."
            labelProps={{ color: useColorModeValue('black', 'white') }}
          />
          <Button borderRadius={12} type="submit" fontWeight="bold" color="black" bg="orange.200">
            Submit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
