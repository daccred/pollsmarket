export enum NetworkEnum {
  ETHEREUM = '0x1',
  ROPSTEN = '0x3',
  HARMONY_TESTNET = '0x6357d2e0',
  HARMONY_MAINNET = '0x63564C40',
}

/**
 * @dev DocumentStatus
 * Use to define the publish status of the document, off-chain and on-chain
 */
export enum DocumentStatus {
  DRAFT = 'draft',
  ARCHIVED = 'archived',
  PUBLISHED = 'published',
}

/**
 * @dev QueryKeyEnum
 * Use to define the query keys for the React query state
 * @see https://react-query.tanstack.com/guides/ssr#using-hydration for working with SSR hydration
 */
export enum PageQueryKeyEnum {
  CONNECT = '/connect',
  DASHBOARD = '/dashboard',
}

export enum CredentialType {
  CERTIFICATE = 'certificate',
  BADGE = 'badge',
  ACCESS_PASS = 'access pass',
  COMMUNITY_BADGES = 'community badges',
  OTHERS = 'others',
}

export enum CredRowStatus {
  DRAFT = 'draft',
  ARCHIVED = 'archived',
  PUBLISHED = 'published',
}

export enum ChainType {
  ETH = 'ethereum',
  HMY = 'harmony',
}
