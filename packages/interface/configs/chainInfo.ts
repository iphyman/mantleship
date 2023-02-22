import { BaseChainInfo, ConnectionType } from "app/types";
import { ChainId } from "./chains";

export const CHAIN_INFO: { [chainId: number]: BaseChainInfo } = {
  [ChainId.MANTLE_TESTNET]: {
    blockExplorerUrl: "https://explorer.testnet.mantle.xyz",
    chainName: "Mantle Testnet",
    iconUrl: "/blockchains/mantle.png",
    rpcUrl: "https://rpc.testnet.mantle.xyz",
    connectors: [ConnectionType.METAMASK],
    nativeCurrency: {
      name: "Mantle",
      symbol: "$BIT",
      decimals: 18,
    },
  },
};

export const getChainInfo = (chainId: any) => {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined;
  }

  return undefined;
};

export const getAddChainParameters = (chainId: number) => {
  const info = CHAIN_INFO[chainId];

  return {
    chainId,
    chainName: info.chainName,
    rpcUrls: [info.rpcUrl],
    nativeCurrency: info.nativeCurrency,
    blockExplorerUrls: [info.blockExplorerUrl],
  };
};

export const RPC_URLS: { [chainId: number | string]: string } = Object.keys(
  CHAIN_INFO
).reduce<{
  [chainId: number]: string;
}>((accumulator, chainId) => {
  const validRpcurl: string = CHAIN_INFO[Number(chainId)].rpcUrl;

  if (validRpcurl) {
    accumulator[Number(chainId)] = validRpcurl;
  }

  return accumulator;
}, {});

export const EXPLORER_URLS: { [chainId: number]: string } = Object.keys(
  CHAIN_INFO
).reduce<{
  [chainId: number]: string;
}>((accumulator, chainId) => {
  const validUrl: string = CHAIN_INFO[Number(chainId)].blockExplorerUrl;

  if (validUrl) {
    accumulator[Number(chainId)] = validUrl;
  }

  return accumulator;
}, {});
