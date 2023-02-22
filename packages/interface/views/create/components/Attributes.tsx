import { ChangeEvent } from "react";
import { useMintStore } from "app/store";
import { shallow } from "zustand/shallow";
import {
  VStack,
  Text,
  FormLabel,
  HStack,
  Switch,
  FormControl,
  Input,
} from "@chakra-ui/react";

export const Attributes = () => {
  const [attributes, setAttributes, showAttributes, handleShowAttributes] =
    useMintStore(
      (state) => [
        state.attributes,
        state.setAttributes,
        state.showProperties,
        state.setShowProperties,
      ],
      shallow
    );

  const handleAttributeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    type: "key" | "value"
  ) => {
    if (!attributes) return;

    const attribute = attributes[index];

    if (type === "value") {
      attribute.value = e.target.value;
      setAttributes([...attributes]);
    }

    if (type === "key") {
      attribute.trait_type = e.target.value;
      setAttributes([...attributes]);
    }

    const last = attributes[attributes.length - 1];

    if (attribute.trait_type === "" || attribute.value === "") {
      if (last.trait_type === "" && last.value === "") {
        attributes.pop();
        setAttributes([...attributes]);
      }
    }

    if (attribute.value !== "" && attribute.trait_type !== "") {
      if (last.trait_type !== "" || last.trait_type !== "") {
        attributes.push({
          trait_type: "",
          value: "",
        });
        setAttributes([...attributes]);
      }
    }
  };

  return (
    <>
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <VStack alignItems="flex-start">
          <FormLabel marginBottom="0px">Properties</FormLabel>
          <Text textAlign="left" marginTop="0px !important">
            Add properties that will show up for this item.
          </Text>
        </VStack>
        <Switch
          colorScheme="teal"
          size="lg"
          checked={showAttributes}
          onChange={handleShowAttributes}
        />
      </HStack>
      {showAttributes &&
        attributes?.map((trait, index) => (
          <FormControl key={index}>
            <HStack w="full">
              <FormControl>
                <Input
                  placeholder="E.g. size"
                  value={trait.trait_type}
                  onChange={(e) => handleAttributeChange(e, index, "key")}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="E.g. XL"
                  value={trait.value}
                  onChange={(e) => handleAttributeChange(e, index, "value")}
                />
              </FormControl>
            </HStack>
          </FormControl>
        ))}
    </>
  );
};
