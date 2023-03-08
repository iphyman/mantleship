import { AddressMap } from "app/types";
import { ChainId } from "./chains";

export const ERC721_FACTORY_ADDRESSES: AddressMap = {
  [ChainId.FANTOM_TESTNET]: "0xaf2fb1cB3b3a44f4812cd6A9661449d432F16c2e",
  [ChainId.MANTLE_TESTNET]: "0xe65c5AB4B1E86cB95FD9401b5FE608Cb87Ed622A",
};

export const ERC721_MANTLE_ADDRESSES: AddressMap = {
  [ChainId.FANTOM_TESTNET]: "0x31b5da73d8c972b84193B7AF0D8503BFD01a4583",
  [ChainId.MANTLE_TESTNET]: "0x46720a2Bf86Fe20EF217B67a8B5E8Be820fa4c85",
};
