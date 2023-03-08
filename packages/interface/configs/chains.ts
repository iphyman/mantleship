export enum ChainId {
  MANTLE_TESTNET = 5001,
  FANTOM_TESTNET = 4002,
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_CHAIN_IDS: ChainId[] = Object.values(ChainId).filter(
  (id) => typeof id === "number"
) as ChainId[];

export const isSupportedChain = (
  chainId: number | null | undefined
): chainId is ChainId => {
  return !!chainId && !!ChainId[chainId];
};
