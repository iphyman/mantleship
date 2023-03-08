import { db } from "app/utils/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { collection } = req.query;
  const collectionId = collection as string;

  try {
    await db.$connect();
    const tokens = await db.token.findMany({
      where: { collectionId },
    });

    res.status(200).json(tokens);
  } catch (error) {
    res.status(403).json(error);
  }
};

export default handler;
