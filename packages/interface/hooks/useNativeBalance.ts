import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";

export function useNativeBalance() {
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { account, provider } = useWeb3React();

  useEffect(() => {
    const fetchBalance = async () => {
      if (account && provider) {
        const weiBalance = await provider.getBalance(account);
        setBalance(Number(formatEther(weiBalance)));
        setIsLoading(false);
      }
    };

    fetchBalance();

    return () => {
      setIsLoading(false);
    };
  }, [account, provider]);

  return { balance, isLoading };
}
