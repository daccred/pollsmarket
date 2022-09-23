import z from 'zod';
/* ------------------- */

export const SITE_NAME = 'Polls Market';
export const SITE_URL = process.env.NEXT_PUBLIC_URL;
export const SITE_BASE_URL = z
  .string()
  .url({
    message: 'NEXT_PUBLIC_URL is missing in env',
  })
  .parse(process.env.NEXT_PUBLIC_URL ?? '');

export const REDIS_URL = process.env.REDIS_URL as string;
export const REDIS_TOKEN = process.env.REDIS_TOKEN as string;

/* ------------------------------------------------------------------- */
/*                all our smart contracts and the networks            */
/* ----------------------------------------------------------------- */
// .string({
//     description: 'NEXT_PUBLIC_DAPP_REGISTRY',
// })
// .min(10, {
//     message: 'NEXT_PUBLIC_DAPP_REGISTRY is missing in env',
// })
// .safeParse() as unknown as string;
export const REGISTRY = process.env.NEXT_PUBLIC_DAPP_REGISTRY as string;

/**@deprecated  */
export const MORALIS_SERVER_URL = '0xd332989aa911045bd4c15c3b57bef80d01f4d699';

/**@deprecated  */
export const MORALIS_APP_ID = '0xd332989aa911045bd4c15c3b57bef80d01f4d699';

/* -------------------------------------------------------------------------- */
/*                constants to work with authentication helpers               */
/* -------------------------------------------------------------------------- */
export const AUTH = {
  loginRoute: '/connect',
  defaultRoute: '/',
  rootRoute: '/studio',
  key: '__app.sid__', // for user profile
  token: '__connect.id__', // for the auth JWT token
};

/* env natives */
export const __BROWSER__ = typeof window !== 'undefined';
export const __DEV__ = process.env.NODE_ENV === 'development';
export const DAY_IN_SECONDS = 43200;
export const HALFDAY_IN_SECONDS = 86400;
