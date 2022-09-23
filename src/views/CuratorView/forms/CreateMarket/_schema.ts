import * as z from 'zod';
import { BytesLike, formatBytes32String, parseEther } from 'ethers/lib/utils';
import { BigNumberish } from 'ethers/lib/ethers';
import { PromiseOrValue } from '@bbnpolls/chain/types/common';
import { HALFDAY_IN_SECONDS } from '@/config';

export interface UseCurateFormProps {
  stakingAmount: number;
  predictionOutcomes: string[];
  deadline: number;
  question: string;
}

export type FormHandleCompleteOptions = FormInputRequest & {
  callResponse: {
    hash: string;
  };
  event: any[];
  enabled: boolean;
};

export type ForContractProps = [
  name: PromiseOrValue<string>,
  symbol: PromiseOrValue<string>,
  curator: PromiseOrValue<string>,
  outcomes: PromiseOrValue<BytesLike[]>,
  fee: PromiseOrValue<BigNumberish>,
  maxSupply: PromiseOrValue<BigNumberish>,
  expiryDate: PromiseOrValue<BigNumberish>
];

export default class Schema {
  private _input: FormInputRequest;
  public fee;
  public symbol;
  public ticketSupply;
  public expiryDate;

  /* extract and transform all variables */
  constructor(input: FormInputRequest) {
    this._input = input;
    this.fee = parseEther(`${input.stakingAmount}`);
    this.symbol = this._textToSymbol(input.question);
    this.ticketSupply = this._setTicketSupplyParams(input);
    this.expiryDate = new Date(input.eventDeadline).getTime();
  }

  /**
   * @name _textToSymbol
   * @desc Generate a symbol value from the input question
   */
  private _textToSymbol = (str: string) => {
    const matches = str.match(/\b(\w)/g);
    const acronym = matches?.join('').substring(0, 4);
    return acronym?.toUpperCase() as string;
  };

  /**
   * @name _setTicketSupplyParams
   * @desc Get Supply Params unless user does not impose limits default to 1_000_000
   */
  private _setTicketSupplyParams = ({ limitMaxTicketSupply, maxTicketSupply }: FormInputRequest): number => {
    return limitMaxTicketSupply ? parseInt(maxTicketSupply) : 1_000_000;
  };

  /**
   * @name _outcomesToBytesArray
   * @desc parse outcome strings and generate bytes32 Hex Array Dict for Outcomes
   */
  private _outcomesToBytesArray = (outcomes: FormInputRequest['eventOutcomes']): BytesLike[] => {
    return outcomes.map((outcome) => formatBytes32String(outcome));
  };

  /**
   * @name trpcInputSchema
   * @desc Utilize zod to generate a validation schema for tRPC API
   */
  static trpcInputSchema = z.object({
    transactionHash: z.string(),
    contractAddress: z.string(),
    outcomes: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    ),
    closedAt: z.date(),
    createdAt: z.date(),
    fee: z.object({
      type: z.string(),
      hex: z.string(),
    }),
    question: z.string(),
    curator: z.string(),
    stakingAmount: z.number(),
    resolutionTime: z.date().min(new Date(Date.now())),
    maxTicketSupply: z.string(),
    limitTicketSupply: z.boolean(),
    resolutionSource: z.string(),
    resolutionLink: z.string(),
  });

  static prepareValuesForTrpc(args: FormHandleCompleteOptions): TrpcInputRequest {
    const outcomesPayload = this._outcomesToByteDict(args.eventOutcomes);

    return {
      transactionHash: args.callResponse.hash,
      contractAddress: args.event[0],
      outcomes: outcomesPayload,
      closedAt: new Date(args.eventDeadline),
      createdAt: new Date(Date.now()),
      fee: args.event[3],
      question: args.question,
      curator: args.curator,
      stakingAmount: args.stakingAmount,
      limitTicketSupply: args.limitMaxTicketSupply,
      maxTicketSupply: args.maxTicketSupply,
      resolutionTime: new Date(args.resolutionTime),
      resolutionSource: args.resolutionSource,
      resolutionLink: args.resolutionLink,
    };
  }

  /**
   * @name _outcomesToByteDict
   * @desc parse outcome strings and generate bytes32 Hex Array Dict for Outcomes
   */
  static _outcomesToByteDict = (outcomes: FormInputRequest['eventOutcomes']) => {
    return outcomes.map((outcome) => ({
      name: outcome,
      value: formatBytes32String(outcome),
    }));
  };
  /**
   * @name prepareValuesForContract
   * @desc Generate input values for the smart contract operation
   */
  public prepareValuesForContract(): ForContractProps {
    /* This array must be in this order for smart contracts */
    const outcomesArray = this._outcomesToBytesArray(this._input.eventOutcomes);
    return [this._input.question, this.symbol, this._input.curator, outcomesArray, this.fee, this.ticketSupply, this.expiryDate];

    /**
     * @name prepareValuesForTrpc
     * @desc Generate input values for the TRPC operation
     */
  }

  /**
   * @name validationSchema
   * @desc Utilize zod to generate a validation schema for form inputs
   */
  static validationSchema = z.object({
    question: z.string(),
    curator: z.string(),
    stakingAmount: z.number(),
    eventDeadline: z.date().min(new Date(Date.now() + HALFDAY_IN_SECONDS)),
    resolutionTime: z.date().min(new Date(Date.now() + HALFDAY_IN_SECONDS)),
    // eventDeadline: z.string().min(8, { message: 'You must add a date' }),
    // resolutionTime: z.string().min(8, { message: 'You must add a date' }),
    maxTicketSupply: z.string(),
    limitMaxTicketSupply: z.boolean(),
    eventOutcomes: z.array(z.string().max(30, 'only 30 characters allowed')).min(2).max(5),
    resolutionSource: z.string(),
    resolutionLink: z.string(),
  });

  static formDefaultValues: FormInputRequest = {
    question: 'Will Ijeoma leave in the next Elimination for Level 3 Housemates',
    stakingAmount: 2.0,
    curator: '',
    eventDeadline: undefined as any, // we dont want to pass defaults
    resolutionTime: undefined as any, // we dont want to pass defaults
    eventOutcomes: ['Yes she will', 'No she will not'],
    limitMaxTicketSupply: false,
    resolutionSource: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    maxTicketSupply: '1000000',
    resolutionLink: 'https://www.dstv.com/africamagic/en-ng/home',
  };
}

export type FormInputRequest = z.infer<typeof Schema.validationSchema>;
export type TrpcInputRequest = z.infer<typeof Schema.trpcInputSchema>;
