// import { createMutation, fetchQuery } from '@bbnpolls/api/src/index';
// import { KeyFn } from '@bbnpolls/api/src/rest/common';

// // Fetch apis without id or query params
// const homekey = '/home';
// export const useHomeApi = fetchQuery({
//     key: homekey,
//     api: {
//         url: '/api/home',
//         method: 'GET',
//         params: { onError: { skipAll: true } },
//     },
// });

// // Fetch apis with id
// const homekeyWithId: KeyFn = ({ id }) => `/home/${id}`;
// export const useHomeApiWithId = fetchQuery({
//     key: homekeyWithId,
//     api: {
//         url: ({ id }) => `/api/home/${id}`,
//         method: 'GET',
//         params: { onError: { skipAll: true } },
//     },
// });

// // Fetch apis with queryParams
// const homekeyWithQueryParams: KeyFn = ({ queryParams }) => [`/home`, queryParams ?? {}];
// export const useHomeApiWithQueryParams = fetchQuery({
//     key: homekeyWithQueryParams,
//     api: {
//         url: ({ id }) => `/api/home/${id}`,
//         method: 'GET',
//         params: { onError: { skipAll: true } },
//     },
// });

// // Fetch apis with queryParams and ID
// const homekeyWithQueryParamsAndId: KeyFn = ({ id, queryParams }) => [`/home/${id}`, queryParams ?? {}];
// export const useHomeApiWithQueryParamsAndId = fetchQuery({
//     key: homekeyWithQueryParamsAndId,
//     api: {
//         url: ({ id }) => `/api/home/${id}`,
//         method: 'GET',
//         params: { onError: { skipAll: true } },
//     },
// });

// // Create apis with id or query params
// export const useCreateHomeApi = createMutation({
//     keysToRefetch: [homekey],
//     api: {
//         url: '/api/home',
//         method: 'POST',
//         content: 'json',
//         authenticate: true,
//         params: { onError: { message: `Failed to create API Key` } },
//     },
//     mutation: {
//         onError: (error) => {
//             console.warn(error);
//         },
//     },
// });

// // Create apis with id
// export const useCreateHomeApiWithId = createMutation({
//     keysToRefetch: [homekeyWithId],
//     api: {
//         url: ({ id }) => `/api/home/${id}`,
//         method: 'POST',
//         content: 'json',
//         authenticate: true,
//         params: { onError: { message: `Failed to create API Key` } },
//     },
//     mutation: {
//         onError: (error) => {
//             console.warn(error);
//         },
//     },
// });
// eslint-disable-next-line import/no-anonymous-default-export
export default {};
