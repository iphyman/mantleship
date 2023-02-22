import type { Web3ReactHooks } from "@web3-react/core";
import type { Connector } from "@web3-react/types";

export enum ConnectionType {
  METAMASK = "METAMASK",
  NETWORK = "NETWORK",
}

export interface BaseChainInfo {
  readonly blockExplorerUrl: string;
  readonly chainName: string;
  readonly iconUrl: string;
  readonly rpcUrl: string;
  readonly connectors: ConnectionType[];
  readonly nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18 | number;
  };
}

export interface WalletInfo {
  connector: Connection;
  name: string;
  iconURL: string;
  description: string;
  href: string | null;
  disabled: boolean;
  primary?: boolean;
  mobile?: boolean;
  mobileOnly?: boolean;
}

export interface Connection {
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
}

export type AddressMap = { [chainId: number]: string };

export interface MetaDataAtribute {
  trait_type: string;
  value: string | number;
  display_type?: "boost_percentage" | "number";
}

export interface TokenMetaData {
  attributes?: MetaDataAtribute[];
  description?: string;
  external_url?: string;
  image: string;
  name: string;
}

export type MintFormCollection = {
  name: string;
  address: string;
};

export interface MintFormData {
  showProperties: boolean;
  collections: MintFormCollection[];
  activeCollection: MintFormCollection;
  royalty: string;
}

export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export interface CollectionPayload {
  name: string;
  symbol: string;
  description?: string;
}
