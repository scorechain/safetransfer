import { blockchainType } from './models/enumType/blockchainType';
export const getBlockchainName = (
  chainIdWithPrefix: string | null,
): blockchainType | null => {
  if (!chainIdWithPrefix) {
    return null;
  }

  if (chainIdWithPrefix.startsWith('eip155:')) {
    const chainId = chainIdWithPrefix.replace('eip155:', '');
    const chainMap: { [key: string]: blockchainType } = {
      '1': blockchainType.ETHEREUM,
      '137': blockchainType.POLYGON,
      '56': blockchainType.BSC,
      '43114': blockchainType.AVALANCHE,
      '11155111': blockchainType.ETHEREUM

    };

    return chainMap[chainId] || null;
  }
  return null;
};
