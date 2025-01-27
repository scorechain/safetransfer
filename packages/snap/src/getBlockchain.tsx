import { BlockchainType } from './models/enumType/BlockchainType';

export const getBlockchainName = (
  chainIdWithPrefix: string | null,
): BlockchainType | null => {
  if (!chainIdWithPrefix) {
    return null;
  }

  if (chainIdWithPrefix.startsWith('eip155:')) {
    const chainId = chainIdWithPrefix.replace('eip155:', '');
    const chainMap: { [key: string]: BlockchainType } = {
      '1': BlockchainType.ETHEREUM,
      '11155111': BlockchainType.ETHEREUM,
      '8453': BlockchainType.BASE,
      '137': BlockchainType.POLYGON,
      '56': BlockchainType.BSC,
      '43114': BlockchainType.AVALANCHE,
    };

    return chainMap[chainId] ?? null;
  }
  return null;
};
