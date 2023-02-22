import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

export const SearchBar = () => {
  const bg = useColorModeValue("gray.700", "white");

  return (
    <Box
      width="full"
      _dark={{ bg: "gray.700" }}
      boxShadow="base"
      marginRight="1.5rem"
      marginLeft="1.5rem"
      rounded="md"
    >
      <InputGroup width="full">
        <InputLeftElement pointerEvents="none">
          <Icon as={BsSearch} boxSize="1.5rem" color="gray.300" />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Search items, collections and accounts"
        />
        <InputRightElement width="85px">
          <HStack justifyContent="flex-start" spacing="4px">
            <Kbd rounded="2px">Ctrl</Kbd>
            <Kbd rounded="2px">K</Kbd>
          </HStack>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
