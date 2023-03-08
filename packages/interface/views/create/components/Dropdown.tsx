import {
  Button,
  chakra,
  HStack,
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  useDisclosure,
  Text,
  Icon,
  PopoverBody,
  PopoverContent,
  VStack,
} from "@chakra-ui/react";
import { shallow } from "zustand/shallow";
import { Identicon } from "app/components/Web3Status/Identicon";
import { useMintStore } from "app/store";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CollectionModal from "app/components/ModalViews/CollectionModal";
import { useWeb3React } from "@web3-react/core";
import { DEFAULT_COLLECTION_NAME, ERC721_MANTLE_ADDRESSES } from "app/configs";
import { Collection } from "@prisma/client";
import { useEffect } from "react";
import axios from "axios";

export const Dropdown = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainId, account } = useWeb3React();
  const {
    isOpen: isCreateCollectionOpen,
    onOpen: openCreateCollectionModal,
    onClose: closeCreateCollectionModal,
  } = useDisclosure();

  const [collections, activeCollection, setActiveCollection, setCollections] =
    useMintStore(
      (state) => [
        state.collections,
        state.activeCollection,
        state.setActiveCollection,
        state.setCollections,
      ],
      shallow
    );

  useEffect(() => {
    const fetch = async () => {
      if (account) {
        const response = await axios.get<Collection[]>(
          `/api/${account}/collections?chainId=${chainId}`
        );
        setCollections([...response.data]);
      }
    };

    fetch();
  }, [account, chainId]);

  return (
    <>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom-end"
        offset={[0, 18]}
        matchWidth
      >
        <PopoverAnchor>
          <chakra.span>
            <PopoverTrigger>
              <Button
                colorScheme="gray"
                w="full"
                h="3rem"
                justifyContent="space-between"
                onClick={onOpen}
              >
                <HStack>
                  <Identicon size={24} seed={activeCollection.address} />
                  <Text>{activeCollection.name}</Text>
                </HStack>
                <Icon as={isOpen ? BsChevronUp : BsChevronDown} />
              </Button>
            </PopoverTrigger>
          </chakra.span>
        </PopoverAnchor>
        <PopoverContent w="full">
          <PopoverBody padding="0px" maxHeight="280px" overflowY="auto">
            <VStack w="full" spacing={0}>
              <Button
                colorScheme="gray"
                w="full"
                h="3rem"
                onClick={openCreateCollectionModal}
                justifyContent="flex-start"
                borderRadius={0}
              >
                <HStack>
                  <Icon as={AiOutlinePlusCircle} boxSize="24px" />
                  <Text>Create a new collection</Text>
                </HStack>
              </Button>
              {chainId && (
                <Button
                  colorScheme="gray"
                  w="full"
                  h="3rem"
                  onClick={() => {
                    setActiveCollection({
                      name: DEFAULT_COLLECTION_NAME,
                      address: ERC721_MANTLE_ADDRESSES[chainId],
                    });
                    onClose();
                  }}
                  justifyContent="flex-start"
                  borderRadius={0}
                >
                  <HStack>
                    <Identicon
                      size={24}
                      seed={ERC721_MANTLE_ADDRESSES[chainId]}
                    />
                    <Text>{DEFAULT_COLLECTION_NAME}</Text>
                  </HStack>
                </Button>
              )}
              {collections.map((collection) => {
                return (
                  <Button
                    w="full"
                    h="3rem"
                    justifyContent="flex-start"
                    colorScheme="gray"
                    borderRadius={0}
                    onClick={() => {
                      setActiveCollection({
                        name: collection.name as string,
                        address: collection.collectionId,
                      });
                      onClose();
                    }}
                    key={collection.collectionId}
                  >
                    <HStack>
                      <Identicon size={24} seed={collection.collectionId} />
                      <Text>{collection.name}</Text>
                    </HStack>
                  </Button>
                );
              })}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <CollectionModal
        isOpen={isCreateCollectionOpen}
        onClose={closeCreateCollectionModal}
      />
    </>
  );
};
