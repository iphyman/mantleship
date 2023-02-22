import {
  Box,
  Button,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMintStore } from "app/store";
import Image from "next/image";
import { FaInbox, FaTelegram, FaTwitter } from "react-icons/fa";
import { shallow } from "zustand/shallow";
import { ShareButton } from "./ShareButton";

export default function NftCreatedModal(
  props: Pick<ModalProps, "isOpen" | "onClose">
) {
  const { isOpen, onClose } = props;
  const [collection, name, txHash, previewURL, reset] = useMintStore(
    (state) => [
      state.activeCollection,
      state.name,
      state.txHash,
      state.previewURL,
      state.reset,
    ],
    shallow
  );

  const shareText = `Hello there, I just created an NFT on the Mantle blockchain with collection address ${collection.address}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <VStack
            alignItems="center"
            justifyContent="center"
            position="relative"
            w="full"
            h="20rem"
          >
            <HStack
              w="full"
              h="full"
              maxW="18rem"
              pos="relative"
              overflow="hidden"
              borderRadius="8px"
              margin="2rem 2rem 0rem 2rem"
            >
              {previewURL && <Image src={previewURL} alt={name} fill />}
            </HStack>
            <Text fontSize="1.5rem" fontWeight={600}>
              Your NFT minted successfully
            </Text>
          </VStack>
          <Box w="full" padding="2rem">
            <HStack justifyContent="center">
              <VStack>
                <Text fontSize="12px" fontWeight={600}>
                  Status
                </Text>
                <Text fontSize="1rem" fontWeight={600} color="green.100">
                  Confirmed
                </Text>
              </VStack>
              <VStack>
                <Text fontSize="12px" fontWeight={600}>
                  Transaction Hash
                </Text>
                <Text>
                  <Link
                    href={`https://explorer.testnet.mantle.xyz/tx/${txHash}`}
                    isExternal
                  >
                    {`${txHash.substring(0, 9)}...`}
                  </Link>
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Text fontSize="1.5rem" fontWeight={600} textAlign="center">
            Let &apos;s spread the word
          </Text>
          <HStack marginY="1.5rem" justifyContent="center">
            <ShareButton
              colorScheme="twitter"
              text={shareText}
              leftIcon={<FaTwitter />}
            >
              Twitter
            </ShareButton>
            <ShareButton
              colorScheme="telegram"
              text={shareText}
              leftIcon={<FaTelegram />}
            >
              Telegram
            </ShareButton>
            <ShareButton
              colorScheme="messenger"
              text={shareText}
              leftIcon={<FaInbox />}
            >
              Email
            </ShareButton>
          </HStack>
          <HStack spacing={3}>
            <Button
              colorScheme="gray"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Close
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
