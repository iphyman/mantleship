import dynamic from "next/dynamic";

const MyCollectionsPage = dynamic(() => import("app/views/collections"), {
  ssr: false,
});

export default function MyCollections() {
  return <MyCollectionsPage />;
}
