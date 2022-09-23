import React from 'react';
import View from '@/views/CuratorView/pages/eventid';


import Moralis  from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';



/* Page components */
import { Meta } from '@/next/index';
import { ProgressiveLayout } from '@/components/partials';

/* We always export pages as PAGE */
export default function Page() {
  return (
    <React.Fragment>
      <Meta title={'[Market Event]'} />
      <View />
    </React.Fragment>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <ProgressiveLayout>{page}</ProgressiveLayout>;
};



export async function getServerSideProps(context) {

const chain = process.env.DAPP_CHAIN;
const address = context.params.id;

await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
});

const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
});

  return {
      props: {
          nfts
      },
  };
}