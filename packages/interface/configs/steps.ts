export const COLLECTION_STEPS = [
  {
    title: "Deploy",
    description: "Please wait while we deploy code for the new smart contract.",
    status: "processing",
  },
  {
    title: "Indexer",
    description: "Waiting for indexer, to store the collection data.",
    status: "pending",
  },
];

export const CREATE_NFT_STEPS = [
  {
    title: "Uploading files",
    description: "Please wait while we upload your file to IPFS.",
    status: "processing",
  },
  {
    title: "Generating metadata",
    description: "Please wait while we generate metadata for this NFT.",
    status: "pending",
  },
  {
    title: "Minting",
    description: "Please wait while we mint your NFT.",
    status: "pending",
  },
];
