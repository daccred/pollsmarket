import { JSONSchema7 } from 'json-schema';
import { CredentialType, CredRowStatus } from './enums';
import { NetworkIndex } from './networks';

export type RadioGroupProps<T> = {
  name?: string;
  options: T[];
  onChange: (data: T) => void;
  value: T | undefined;
  label?: string;
};

export type TRecipientDataMedium = 'csv' | 'forms' | 'contacts' | string;
export type TNetworkProtocol = 'eth_kovan' | 'eth_mainnet' | 'bsc' | 'matic' | string;

export interface ClaimOptionsVar {
  medium: TRecipientDataMedium;
  schema: JSONSchema7;
}

export interface CredentialCreateOptions {
  claim: ClaimOptionsVar;
  template: JSON;
  certName: string;
  certDescription: string;
  protocol: TNetworkProtocol;
}

/** Menu options for each row in a credential list: should come from API */
export type TCredMenuOptions = 'edit' | 'delete' | 'copy' | 'archive' | 'publish' | 'preview';

export interface CredentialRowDataProps {
  meta: {
    name: string;
    network: NetworkIndex;
  };
  type: CredentialType;
  dateIssued: string | Date;
  claimed: string;
  status: CredRowStatus;
  recipients: string;
  options: TCredMenuOptions[];
}
