import { NFTStorage, File, Blob } from 'nft.storage';
import { TokenInput } from 'nft.storage/dist/src/lib/interface';
import config from '../../../infra/config';
import { ConflictError } from '../../../infra/errors';
import logger from '../../../infra/logger';
import { metadata as runFile } from '../metadata';

export interface MetadataInput extends TokenInput {
  external_url: string;
  animation_url: string;
  attributes?: TokenInput['properties'];
}

/* Init storage client */
export const client = new NFTStorage({ token: config.NFT_STORAGE_TOKEN });
export const sampleBlob = new Blob([JSON.stringify(runFile)], { type: 'application/json' });

/**
 * @function storeRawBlob
 * @description Store raw blob on IPFS - used to store metadata json
 */
export const blobUploadHandler = async (blob: Blob): Promise<string> => {
  try {
    const cid = await client.storeBlob(blob);
    logger.debug(`Stored blob with CID: ${cid}`);
    return cid;
  } catch (error) {
    throw new ConflictError(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const metadataUploadHandler = async (b64Img: string, meta: Omit<MetadataInput, 'image'>) => {
  const commaIndex = b64Img.indexOf(',');
  const _data = b64Img.slice(commaIndex + 1);

  /* Working with file */
  // https://stackoverflow.com/questions/48237766/file-is-not-defined-error-in-javascript-while-executing-from-node-js-command-p
  // Testing utils https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/main/src/__tests__/ParseFile-test.js
  const data = Buffer.from(_data, 'base64');
  const file = await new File([data], meta.name, { type: 'image/png' });
  /**
   * For NFTs that follow the ERC-1155 metadata specification, the store method provides
   * a convenient way to upload your NFT assets (images, etc) in the same operation as your metadata,
   * with the client taking care of the details of linking from the metadata to the assets.
   */
  const metadata = await client.store({
    ...meta,
    image: file,
  });

  /* return the metadata for tokenURI storage */
  return {
    url: metadata.url,
    ipfs: metadata.data,
    ipnft: metadata.ipnft,
    embed: metadata.embed(), // for browsers
  };
};

/**
 * @name generateMetadataForPrediction
 * @desc Generate an NFT using the layout and metadata for a token prediction
 */
export const generateMetadataForPrediction = async (b64Img: string, meta: Omit<MetadataInput, 'image'>) => {
  const commaIndex = b64Img.indexOf(',');
  const _data = b64Img.slice(commaIndex + 1);

  /* Working with file */
  const data = Buffer.from(_data, 'base64');
  const file = await new File([data], meta.name, { type: 'image/png' });
  /**
   * For NFTs that follow the ERC-1155 metadata specification, the store method provides
   * a convenient way to upload your NFT assets (images, etc) in the same operation as your metadata,
   * with the client taking care of the details of linking from the metadata to the assets.
   */
  const metadata = await client.store({
    ...meta,
    image: file,
  });

  /* return the metadata for tokenURI storage */
  return {
    url: metadata.url,
    image: metadata.data.image.toJSON(),
    ipfs: metadata.data,
    ipnft: metadata.ipnft,
    embed: metadata.embed().image.toJSON(), // for browsers
  };
};
