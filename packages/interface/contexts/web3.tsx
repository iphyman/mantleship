import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { getConnectionInfo, WALLET_CONNECTIONS } from "app/configs";
import useEagerlyConnect from "app/hooks/useEagerlyConnect";
import { Connection } from "app/types";
import { ReactNode, useMemo } from "react";

export default function Web3Provider({ children }: { children: ReactNode }) {
  useEagerlyConnect();

  const connectors: [Connector, Web3ReactHooks][] = WALLET_CONNECTIONS.map(
    ({ hooks, connector }) => [connector, hooks]
  );

  const key = useMemo(
    () =>
      WALLET_CONNECTIONS.map(
        ({ type }: Connection) => getConnectionInfo(type).name
      ).join("-"),
    []
  );

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      {children}
    </Web3ReactProvider>
  );
}
