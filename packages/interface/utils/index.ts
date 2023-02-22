import { isAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import type { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { MetaDataAtribute } from "app/types";

export const shortenAddress = (address: string, chars = 4) => {
  if (!isAddress(address)) {
    throw new Error("Invalid wallet address provided");
  }

  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
};

// account is not optional
function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
  return provider.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(
  provider: JsonRpcProvider,
  account?: string
): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  provider: JsonRpcProvider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(provider, account) as any
  );
}

export function validateDataMetaAttributes(
  attributes: MetaDataAtribute[] | undefined
) {
  const result: MetaDataAtribute[] = [];

  attributes?.map((attribute) => {
    if (attribute.trait_type !== "" || attribute.value !== "") {
      result.push(attribute);
    }
  });

  return result;
}
