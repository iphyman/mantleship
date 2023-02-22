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

export const Dropdown = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateCollectionOpen,
    onOpen: openCreateCollectionModal,
    onClose: closeCreateCollectionModal,
  } = useDisclosure();

  const [collections, activeCollection, setActiveCollection] = useMintStore(
    (state) => [
      state.collections,
      state.activeCollection,
      state.setActiveCollection,
    ],
    shallow
  );

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
          <PopoverBody padding="0px">
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
              {collections.map((collection) => {
                return (
                  <Button
                    w="full"
                    h="3rem"
                    justifyContent="flex-start"
                    colorScheme="gray"
                    borderRadius={0}
                    onClick={() => {
                      setActiveCollection(collection);
                      onClose();
                    }}
                    key={collection.address}
                  >
                    <HStack>
                      <Identicon size={24} seed={collection.address} />
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
