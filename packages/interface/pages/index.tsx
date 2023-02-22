import dynamic from "next/dynamic";
import Head from "next/head";

const Create = dynamic(() => import("app/views/create"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Mantleship</title>
        <meta
          name="description"
          content="An NFT creation tool for non-developers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Create />
    </>
  );
}
