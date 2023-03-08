import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaDiscord, FaGithub, FaMoon, FaSun, FaYoutube } from "react-icons/fa";

import { Web3Status } from "../Web3Status";

export const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const ColorModeIcon = useColorModeValue(FaMoon, FaSun);
  const themeLabel = useColorModeValue("dark", "light");

  return (
    <Box
      width="full"
      position="sticky"
      top="0px"
      boxShadow="sm"
      transition="all ease 0.2s 0s"
      _dark={{ bg: "gray.800" }}
      _light={{ bg: "white" }}
      zIndex={300}
    >
      <Box
        width="full"
        height="4.5rem"
        maxWidth="8xl"
        padding="0px 1.5rem"
        margin="0 auto"
      >
        <Flex
          width="full"
          height="full"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems="center">
            <Link
              href="/"
              fontSize="1.5rem"
              fontWeight={900}
              _hover={{ textDecor: "none" }}
            >
              Mantleship
            </Link>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="flex-end"
            width="full"
            maxWidth="68rem"
          >
            <HStack spacing="5">
              <Link
                href="https://github.com/iphyman/mantleship"
                isExternal
                aria-label="view mantleship source code"
              >
                <Icon
                  boxSize="5"
                  display="block"
                  transition="color 0.2s ease"
                  _hover={{ color: "gray.600" }}
                  as={FaGithub}
                />
              </Link>
              <Link
                href="https://vimeo.com/806104800"
                isExternal
                aria-label="view mantleship source code"
              >
                <Icon
                  boxSize="5"
                  display="block"
                  transition="color 0.2s ease"
                  _hover={{ color: "gray.600" }}
                  as={FaYoutube}
                />
              </Link>
            </HStack>
            <HStack spacing="5">
              <IconButton
                color="current"
                variant="ghost"
                fontSize="lg"
                size="md"
                ml={{ base: "0", md: "3" }}
                onClick={toggleColorMode}
                icon={<ColorModeIcon />}
                aria-label={`Switch to ${themeLabel} mode`}
              />
              <Web3Status />
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
