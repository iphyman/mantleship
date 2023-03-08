import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { CREATE_NFT_STEPS } from "app/configs/steps";
import { useERC721Collection } from "app/hooks/useContract";
import { useMintStore } from "app/store";
import { TokenApiPayload, TokenMetaData } from "app/types";
import { validateDataMetaAttributes } from "app/utils";
import { pinFileToIPFS, pinJSONToIPFS } from "app/utils/pinata";
import { shallow } from "zustand/shallow";
import { type ContractTransaction } from "ethers";
import ProgressModal from "app/components/ModalViews/ProgressModal";
import NftCreatedModal from "app/components/ModalViews/NftCreatedModal";
import { enqueSnackbar } from "app/components";
import axios from "axios";

import { AssetUpload } from "./AssetUpload";
import { Attributes } from "./Attributes";
import { Dropdown } from "./Dropdown";

export const MintForm = () => {
  const [
    name,
    setName,
    external_url,
    setExternalLink,
    description,
    setDescription,
    royalty,
    setRoyalty,
    activeCollection,
    rawFile,
    attributes,
    setTxHash,
    setProgress,
    setStep,
    reset,
  ] = useMintStore(
    (state) => [
      state.name,
      state.setName,
      state.external_url,
      state.setExternalURL,
      state.description,
      state.setDescription,
      state.royalty,
      state.setRoyalty,
      state.activeCollection,
      state.rawFile,
      state.attributes,
      state.setTxHash,
      state.setProgress,
      state.setStep,
      state.reset,
    ],
    shallow
  );

  const { account } = useWeb3React();
  const erc721 = useERC721Collection(activeCollection.address);
  const {
    isOpen: isProgressModalOpen,
    onClose: closeProgressModal,
    onOpen: openProgressModal,
  } = useDisclosure();

  const {
    isOpen: isSuccessModalOpen,
    onClose: closeSuccessModal,
    onOpen: openSuccessModal,
  } = useDisclosure();

  // const validate = () => !rawFile || !erc721 || !account || !name;

  const handleMint = async () => {
    if (!rawFile || !erc721 || !account || !name) return;

    setProgress(CREATE_NFT_STEPS);
    openProgressModal();
    setStep(1);

    //Upload asset to IPFS
    const { image } = await pinFileToIPFS(rawFile);

    setStep(2);
    //Construct ERC721 metadata
    const metadata: TokenMetaData = {
      attributes: validateDataMetaAttributes(attributes),
      description,
      external_url,
      image,
      name,
    };

    //Upload metadata to IPFS
    const { uri } = await pinJSONToIPFS(metadata);
    setStep(3);

    try {
      let tx: ContractTransaction;
      if (parseInt(royalty) > 0) {
        const royaltyFee = parseInt(royalty) * 100;
        tx = await erc721.mintWithRoyalty(uri, account, royaltyFee);
      } else {
        tx = await erc721.mint(uri);
      }

      enqueSnackbar("Waiting for confirmation", "info");
      const receipt = await tx.wait();

      setTxHash(receipt.transactionHash);
      setStep(4);
      closeProgressModal();
      setProgress(null);
      openSuccessModal();

      const event = receipt?.events?.find((event) => event.event === "Minted");

      if (event && event.args) {
        const [creator, tokenId, collection] = event.args;
        const payload: TokenApiPayload = {
          name,
          tokenId,
          image,
          metadata: uri,
          royaltyFee: royalty,
          collectionId: activeCollection.address,
          owner: creator,
        };
        //Persit token in database would be replaced in the future with indexer
        await axios.post("/api/create/token", payload);

        console.log(`Collection: ${activeCollection.address}`);
        console.log(`Creator: ${creator}`);
        console.log(`TokenId: ${tokenId}`);
      }
    } catch (error) {
      enqueSnackbar(
        "Unable to complete your NFT mint at the moment, try again later",
        "error"
      );
      setProgress(null);
      closeProgressModal();
    }
  };

  return (
    <>
      <VStack w="full" spacing={7} marginY="2rem">
        <Text fontSize="32px" fontWeight={600}>
          Create New Item
        </Text>
        <AssetUpload />
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Item name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </FormControl>
        <FormControl>
          <FormLabel>External link</FormLabel>
          <Input
            placeholder="https://example.com/praying-mantis"
            onChange={(e) => setExternalLink(e.target.value)}
            value={external_url}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Describe your item"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Royalties</FormLabel>
          <Input
            placeholder="E.g. 10 for 10% of sale price"
            type="number"
            onChange={(e) => setRoyalty(e.target.value)}
            value={royalty}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Select collection</FormLabel>
          <Dropdown />
        </FormControl>
        <Attributes />
        <HStack w="full">
          <Button
            colorScheme="gray"
            fontSize="1.5rem"
            color="white"
            w="full"
            h="auto"
            padding="1rem"
            onClick={reset}
          >
            Reset
          </Button>
          <Button
            colorScheme="blue"
            fontSize="1.5rem"
            color="white"
            w="full"
            h="auto"
            padding="1rem"
            onClick={handleMint}
          >
            Create
          </Button>
        </HStack>
      </VStack>
      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={closeProgressModal}
      />
      <NftCreatedModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
      />
    </>
  );
};
