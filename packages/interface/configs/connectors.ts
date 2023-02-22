import { initializeConnector, Web3ReactHooks } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { Connection, ConnectionType, WalletInfo } from "app/types";

import { RPC_URLS } from "./chainInfo";
import { ChainId } from "./chains";

const [metaMaskConnector, metaMaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

export const metaMask: Connection = {
  connector: metaMaskConnector,
  hooks: metaMaskHooks,
  type: ConnectionType.METAMASK,
};

const [networkConnector, networkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({
      actions,
      urlMap: RPC_URLS,
      defaultChainId: ChainId.MANTLE_TESTNET,
    })
);

export const network: Connection = {
  connector: networkConnector,
  hooks: networkHooks,
  type: ConnectionType.NETWORK,
};

export const WALLET_CONNECTIONS = [metaMask, network];

export const connectors: [Connector, Web3ReactHooks][] = [
  [metaMask.connector, metaMask.hooks],
  [network.connector, network.hooks],
];

export const getConnection = (connector: Connector | ConnectionType) => {
  if (connector instanceof Connector) {
    const connection = WALLET_CONNECTIONS.find(
      (connection) => connection.connector === connector
    );

    if (!connection) {
      throw new Error("Unsupported connector");
    }

    return connection;
  } else {
    switch (connector) {
      case ConnectionType.METAMASK:
        return metaMask;
      case ConnectionType.NETWORK:
        return network;
    }
  }
};

export const getConnectionInfo = (connectionType: ConnectionType) => {
  switch (connectionType) {
    case ConnectionType.METAMASK:
      return { name: "MetaMask", icon: "/wallets/metaMask.png" };
    case ConnectionType.NETWORK:
      return { name: "Network", icon: "" };
  }
};

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  [ConnectionType.METAMASK]: {
    connector: metaMask,
    name: "MetaMask",
    iconURL: "/wallets/metaMask.png",
    description: "An easy-to-use wallet",
    href: null,
    disabled: false,
  },
  [ConnectionType.NETWORK]: {
    connector: network,
    name: "",
    iconURL: "",
    description: "",
    href: null,
    disabled: false,
  },
};
