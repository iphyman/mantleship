import { Contract } from "@ethersproject/contracts";
import ERC721COLLECTION_ABI from "app/abis/ERC721Collection.json";
import ERC721MANTLE_ABI from "app/abis/ERC721Mantle.json";
import COLLECTION_FACTORY_ABI from "app/abis/CollectionFactory.json";
import {
  ERC721Collection,
  ERC721Mantle,
  CollectionFactory,
} from "app/abis/types";
import { ERC721_FACTORY_ADDRESSES, ERC721_MANTLE_ADDRESSES } from "app/configs";
import { getContract } from "app/utils";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { provider, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(
        address,
        ABI,
        provider,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [
    addressOrAddressMap,
    ABI,
    provider,
    chainId,
    withSignerIfPossible,
    account,
  ]) as T;
}

export function useERC721Collection(nftAddress: string) {
  return useContract<ERC721Collection>(nftAddress, ERC721COLLECTION_ABI, true);
}

export function useCollectionFactory() {
  const { chainId } = useWeb3React();

  return useContract<CollectionFactory>(
    chainId ? ERC721_FACTORY_ADDRESSES[chainId] : undefined,
    COLLECTION_FACTORY_ABI,
    true
  );
}

export function useERC721Mantle() {
  const { chainId } = useWeb3React();

  return useContract<ERC721Mantle>(
    chainId ? ERC721_MANTLE_ADDRESSES[chainId] : undefined,
    ERC721MANTLE_ABI,
    true
  );
}
