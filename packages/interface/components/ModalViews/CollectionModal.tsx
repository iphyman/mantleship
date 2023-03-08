import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { shallow } from "zustand/shallow";
import { useWeb3React } from "@web3-react/core";
import { useMintStore } from "app/store";
import { useReducer } from "react";
import { CollectionApiPayload, CollectionPayload } from "app/types";
import { useCollectionFactory } from "app/hooks/useContract";
import { COLLECTION_STEPS } from "app/configs/steps";
import dynamic from "next/dynamic";
import axios from "axios";
import { enqueSnackbar } from "..";
import { Collection } from "@prisma/client";

const ProgressModal = dynamic(() => import("./ProgressModal"), { ssr: false });

export default function CollectionModal(
  props: Pick<ModalProps, "isOpen" | "onClose">
) {
  const { isOpen, onClose } = props;
  const {
    onOpen: openProgressModal,
    onClose: closeProgressModal,
    isOpen: isProgressModalOpen,
  } = useDisclosure();
  const { chainId, account } = useWeb3React();

  const collectionFactory = useCollectionFactory();

  const [setProgress, setStep, collections, setCollections] = useMintStore(
    (state) => [
      state.setProgress,
      state.setStep,
      state.collections,
      state.setCollections,
    ],
    shallow
  );

  const [inputs, setInput] = useReducer(
    (inputs: CollectionPayload, updates: Partial<CollectionPayload>) => ({
      ...inputs,
      ...updates,
    }),
    { name: "", symbol: "" }
  );

  const validate = () => {
    return inputs.name !== "" && inputs.symbol !== "" && chainId && account;
  };

  const handleCreate = async () => {
    if (!validate() || !collectionFactory || !chainId) return;
    //close collection modal
    onClose();
    //open progress modal
    setProgress(COLLECTION_STEPS);
    openProgressModal();
    setStep(1);

    const nonce = +new Date();
    const tx = await collectionFactory.createCollection(
      inputs.name,
      inputs.symbol,
      nonce
    );

    setStep(2);
    const receipt = await tx.wait();
    const event = receipt?.events?.find(
      (event) => event.event === "CollectionCreated"
    );

    if (event && event.args) {
      setStep(3);
      //Notify user on success
      enqueSnackbar("Collection created successfully", "success");
      const [collection, creator, name, symbol] = event.args;

      //Save in a persistent database
      const payload: CollectionApiPayload = {
        name,
        symbol,
        collectionId: collection,
        owner: creator,
        blockchainId: chainId.toString(),
      };
      const res = await axios.post<Collection>(
        "/api/create/collection",
        payload
      );
      setCollections([...collections, res.data]);
      console.log(`Collection: ${collection}`);
      console.log(`Creator: ${creator}`);
      console.log(`Name: ${name}`);
      console.log(`Symbol: ${symbol}`);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Collection</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Example: The Mantis Mantle"
                onChange={(e) => setInput({ name: e.target.value })}
                value={inputs.name}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Symbol</FormLabel>
              <Input
                placeholder="Example: TMT"
                onChange={(e) => setInput({ symbol: e.target.value })}
                value={inputs.symbol}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="spread some words about this collection"
                onChange={(e) => setInput({ description: e.target.value })}
                value={inputs.description}
              />
            </FormControl>
            <HStack marginY="2rem">
              <Button colorScheme="gray" w="full" h="3rem" onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                w="full"
                h="3rem"
                disabled={!validate()}
                onClick={handleCreate}
              >
                Create
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={closeProgressModal}
      />
    </>
  );
}
