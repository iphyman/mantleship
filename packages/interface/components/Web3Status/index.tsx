import { Button, chakra, useDisclosure } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { getConnection } from "app/configs";
import { useDesiredChain } from "app/hooks/useDesiredChain";
import { useConnectionStore } from "app/store";
import dynamic from "next/dynamic";

import { AccountDropdown } from "./AccountDropdown";

const WalletModal = dynamic(() => import("../WalletModal"), { ssr: false });

const Web3StatusInner = () => {
  const { account, connector } = useWeb3React();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const connectionType = getConnection(connector).type;
  const error = useConnectionStore(
    (state) => state.errorByConnectionType[connectionType]
  );

  if (account) {
    return <AccountDropdown />;
  } else {
    return (
      <>
        <Button borderRadius="full" onClick={onOpen}>
          Connect
        </Button>
        <WalletModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }
};

export const Web3Status = () => {
  useDesiredChain();

  return (
    <chakra.div>
      <Web3StatusInner />
    </chakra.div>
  );
};
