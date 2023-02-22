import { Box, BoxProps, Button, ButtonProps } from "@chakra-ui/react";

export const BaseButton = (props: ButtonProps) => (
  <Button
    display="flex"
    alignItems="center"
    padding="8px"
    marginRight="2px"
    marginLeft="2px"
    h="full"
    borderRadius="full"
    _focus={{ outline: "none" }}
    cursor="pointer"
    userSelect="none"
    {...props}
  />
);

export const Text = (props: BoxProps) => (
  <Box
    w="fit-content"
    fontSize="1rem"
    fontWeight="500"
    whiteSpace="nowrap"
    overflow="hidden"
    textOverflow="ellipsis"
    flex="1 1 auto"
    margin="0px 8px 0px 4px"
    {...props}
  />
);
