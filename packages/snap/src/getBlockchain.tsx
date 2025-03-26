import { BlockchainType } from './models/enumType/blockchainType';

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
      '42161': BlockchainType.ARBITRUMONE,
      '421614': BlockchainType.ARBITRUMONE, // Arbitrum One Sepolia testnet
      '81457': BlockchainType.BLAST,
      '168587773': BlockchainType.BLAST, // BLAST Sepolia Testnet
      '10': BlockchainType.OPTIMISM,
      '11155420': BlockchainType.OPTIMISM, // OP Sepolia Testnet
    };

    return chainMap[chainId] ?? null;
  }
  return null;
};
