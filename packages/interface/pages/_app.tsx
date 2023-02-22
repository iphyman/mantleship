import { ChakraProvider } from "@chakra-ui/react";
import { AlertModel } from "app/components";
import { Navbar } from "app/components/Navbar";
import { theme } from "app/configs";
import Web3Provider from "app/contexts/web3";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
        <AlertModel />
      </ChakraProvider>
    </Web3Provider>
  );
}
