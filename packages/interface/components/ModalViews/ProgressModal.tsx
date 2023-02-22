import {
  VStack,
  Modal,
  ModalBody,
  Button,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Flex,
  Icon,
  Spinner,
  Text,
  HStack,
} from "@chakra-ui/react";
import { shallow } from "zustand/shallow";
import { useMintStore } from "app/store";
import { BsCheckLg } from "react-icons/bs";

export default function ProgressModal(
  props: Pick<ModalProps, "isOpen" | "onClose">
) {
  const { isOpen, onClose } = props;
  const [progress, setProgress, activeStep] = useMintStore(
    (state) => [state.progress, state.setProgress, state.activeStep],
    shallow
  );

  const handleClose = () => {
    setProgress(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Processing</ModalHeader>
        <ModalBody>
          <VStack spacing={6}>
            {progress?.map((step, index) => {
              const key = index + 1;

              return (
                <HStack
                  w="full"
                  justifyContent="center"
                  alignItems="center"
                  spacing={4}
                  key={index}
                >
                  {activeStep === key ? (
                    <Spinner boxSize="2rem" color="blue.500" />
                  ) : activeStep > key ? (
                    <Icon as={BsCheckLg} boxSize="2rem" color="blue.500" />
                  ) : (
                    <Icon as={BsCheckLg} />
                  )}
                  <VStack
                    w="full"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Text fontSize="1.2rem" fontWeight={700}>
                      {step.title}
                    </Text>
                    <Text fontSize="1rem" marginTop="0px !important">
                      {step.description}
                    </Text>
                  </VStack>
                </HStack>
              );
            })}
          </VStack>
          <Button
            colorScheme="gray"
            onClick={handleClose}
            marginY="2rem"
          >
            Close
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
