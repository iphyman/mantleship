import { Collection } from "@prisma/client";
// import { ChainId, ERC721_MANTLE_ADDRESSES } from "app/configs";
import { MintFormData, TokenMetaData } from "app/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Progress = {
  title: string;
  description: string;
  status: string;
};

type MintForm = MintFormData &
  TokenMetaData & {
    rawFile: File | null;
    previewURL: string | null;
    txHash: string;
    progress: Progress[] | null;
    activeStep: number;
  };

interface MintFormActions {
  setRawFile: (file: File | null) => void;
  setName: (name: string) => void;
  setImage: (image: string) => void;
  setExternalURL: (url: string) => void;
  setDescription: (description: string) => void;
  setAttributes: (attributes: TokenMetaData["attributes"]) => void;
  setShowProperties: () => void;
  setActiveCollection: (collection: MintFormData["activeCollection"]) => void;
  setCollections: (collections: Collection[]) => void;
  setRoyalty: (amount: string) => void;
  setTxHash: (hash: string) => void;
  setPreviewURL: (url: string | null) => void;
  setProgress: (steps: Progress[] | null) => void;
  updateProgress: (completedId: number, nextId?: number) => void;
  reset: () => void;
  setStep: (activeStep: number) => void;
}

type MintFormState = MintForm & MintFormActions;

const INITIAL_STATE: MintForm = {
  activeStep: 1,
  rawFile: null,
  txHash: "",
  previewURL: "",
  name: "",
  description: "",
  image: "",
  external_url: "https://mynft.io",
  attributes: [
    {
      trait_type: "",
      value: "",
    },
  ],
  showProperties: false,
  activeCollection: {
    name: "",
    address: "",
  },
  collections: [],
  royalty: "",
  progress: null,
};

export const useMintStore = create<MintFormState>()(
  devtools(
    persist(
      (set, get) => ({
        ...INITIAL_STATE,
        setRawFile: (file) => set({ rawFile: file }),
        setName: (name) => set({ name: name }),
        setImage: (image) => set({ image: image }),
        setExternalURL: (url) => set({ external_url: url }),
        setDescription: (description) => set({ description: description }),
        setAttributes: (attributes) => set({ attributes: attributes }),
        setShowProperties: () =>
          set((state) => ({ showProperties: !state.showProperties })),
        setActiveCollection: (collection) =>
          set({ activeCollection: collection }),
        setCollections: (collections) => set({ collections: collections }),
        setRoyalty: (amount) => set({ royalty: amount }),
        setTxHash: (hash) => set({ txHash: hash }),
        setPreviewURL: (url) => set({ previewURL: url }),
        setProgress: (progress) => set({ progress }),
        updateProgress: (completedId, nextId) =>
          set(() => {
            const prevProgress = get().progress;
            if (!prevProgress) return { progress: null };
            prevProgress[completedId].status = "completed";

            if (nextId && nextId < prevProgress.length) {
              prevProgress[nextId].status = "processing";
            }

            return { ...prevProgress };
          }),
        reset: () =>
          set(() => {
            const collections = get().collections;

            return { ...INITIAL_STATE, collections };
          }),
        setStep: (activeStep) => set({ activeStep }),
      }),
      {
        name: "mantleship-mint-store",
        version: 1,
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !["rawFile", "image", "collections"].includes(key)
            )
          ),
      }
    )
  )
);
