import { db } from "app/utils/prisma";
import { isAddress } from "ethers/lib/utils";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { account } = req.query;
  const owner = account as string;

  try {
    if (!isAddress(owner)) {
      res.status(403).json({ error: "Invalid account provided" });
    }

    await db.$connect();
    const tokens = await db.token.findMany({
      where: { owner },
    });

    res.status(200).json(tokens);
  } catch (error) {
    res.status(403).json(error);
  }
};

export default handler;
