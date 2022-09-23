import React from 'react';
import { Redis } from '@upstash/redis';
import View from '@/views/MarketView';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import xxh from 'xxhashjs';
import { REDIS_TOKEN, REDIS_URL } from '@/config';

/* Page components */
import { Meta } from '@/next/index';
import { ProgressiveLayout } from '@/components/partials';
import { QueryMarketOutput } from '@/schema/market.schema';

/* We always export pages as PAGE */
export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <React.Fragment>
      <Meta />
      <View data={props.data} />
    </React.Fragment>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <ProgressiveLayout>{page}</ProgressiveLayout>;
};

// get serverside props with Redis directly

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const redis = new Redis({
    url: REDIS_URL,
    token: REDIS_TOKEN,
  });
  // handle api operation and return result
  const redisKey = await xxh.h32(ctx.params?.id as string, 0xcafebabe).toString(16);

  /* persist a hash to key of the market: for findOne Queries  */
  const data = await redis.hgetall(redisKey);

  console.warn(ctx.params, ctx.query, data);

  return {
    props: {
      data: data as QueryMarketOutput,
    },
  };
}
