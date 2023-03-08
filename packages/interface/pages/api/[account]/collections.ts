import { db } from "app/utils/prisma";
import { isAddress } from "ethers/lib/utils";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { account, chainId } = req.query;
  const owner = account as string;
  const blockchainId = chainId as string;

  try {
    if (!isAddress(owner)) {
      res.status(403).json({ error: "Invalid account provided" });
    }

    await db.$connect();
    const collections = await db.collection.findMany({
      where: { ...(blockchainId ? { owner, blockchainId } : { owner }) },
    });

    res.status(200).json(collections);
  } catch (error) {
    res.status(403).json(error);
  }
};

export default handler;
