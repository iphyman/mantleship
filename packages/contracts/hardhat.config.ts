import "dotenv/config";
import { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const chainIds = {
  mantle: 5001,
  moonbase: 1287,
};

export function getPrivateKey(networkName?: string) {
  if (networkName) {
    const privateKey = process.env[networkName.toUpperCase() + "_PRIVATE_KEY"];
    if (privateKey && privateKey !== "") {
      return [privateKey];
    }
  }

  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey === "") {
    return [];
  }
  return [privateKey];
}

export function getRPC(networkName: string): string {
  if (networkName) {
    const uri = process.env[networkName.toUpperCase() + "_RPC_URL"];
    if (uri && uri !== "") {
      return uri;
    }
  }
  return "http://127.0.0.1:8545/";
}

function createConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url = getRPC(network);
  return {
    accounts: getPrivateKey(network),
    chainId: chainIds[network],
    url,
    gasPrice: "auto",
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mantle: createConfig("mantle"),
    moonbase: createConfig("moonbase"),
  },
  namedAccounts: {
    deployer: process.env.deployer || "",
    admin: process.env.admin || "",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};

export default config;
