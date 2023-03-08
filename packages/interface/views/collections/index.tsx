import { Box, SimpleGrid, Skeleton, Text, VStack } from "@chakra-ui/react";
import { Collection } from "@prisma/client";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Placeholder from "app/public/placeholder.jpg";
import Link from "next/link";

export const LoadingRow = ({
  isLoading,
  columns,
}: {
  isLoading: boolean;
  columns: number;
}) => {
  const rows = new Array(columns).fill(null);
  return (
    <>
      {rows.map((row, index) => {
        return (
          <VStack key={index} w="full">
            <Skeleton
              isLoaded={isLoading}
              w="full"
              h="200px"
              borderRadius="0.5rem"
            />
            <Skeleton
              isLoaded={isLoading}
              w="full"
              h="1rem"
              borderRadius="0.5rem"
            />
            <Skeleton
              isLoaded={isLoading}
              w="full"
              h="1rem"
              borderRadius="0.5rem"
            />
          </VStack>
        );
      })}
    </>
  );
};

export default function MyCollectionsPage() {
  const { account } = useWeb3React();
  const [collections, setCollections] = useState<Collection[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (account) {
        const response = await axios.get<Collection[]>(
          `/api/${account}/collections`
        );
        setCollections([...response.data]);
      }
    };

    fetch();
  }, [account]);

  return (
    <VStack w="full" alignItems="center" spacing={7} padding="2rem">
      <Text fontSize="1.5rem" fontWeight={600}>
        My Collections
      </Text>
      <SimpleGrid w="full" columns={5} columnGap={4}>
        {!collections && <LoadingRow isLoading={!collections} columns={5} />}
        {collections?.map((collection) => {
          return (
            <Link
              href={`/${collection.collectionId}`}
              key={collection.collectionId}
              style={{ width: "100%" }}
            >
              <VStack w="full">
                <Box w="full" h="200px" position="relative">
                  <Image src={Placeholder} alt="placeholder" fill />
                </Box>
                <Text fontWeight={600}>{collection.name}</Text>
                <Text>{collection.symbol}</Text>
              </VStack>
            </Link>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
}
