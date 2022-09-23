const event = {
  root: '/discover',
};

const markets = {
  root: `/market`,
  singleParam: '/market/[contractAddress]',
};

const home = {
  root: '/',
};
const prediction = {
  root: '/predictions',
  event: 'prediction/event',
};

const curator = {
  root: '/curator',
  events: '/curator/markets',
  eventForm: '/curator/markets/create',
  curatorFrom: '/curator/start',
};

const social = {
  discord: '#',
  telegram: '#',
  twitter: '#',
};
// const claims = {
//     index: '/claims',
//     address: '/editor/[address]',
//     tokenUri: '/editor/[address]/[tokenURI]',
//   };

export const routes = {
  home,
  markets,
  curator,
  social,
  event,
  prediction,
};

export default routes;
