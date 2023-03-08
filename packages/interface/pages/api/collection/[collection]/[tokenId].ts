import { db } from "app/utils/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { collection, tokenId } = req.query;
  const collectionId = collection as string;

  try {
    await db.$connect();
    const token = await db.token.findFirst({
      where: {
        collectionId: {
          equals: collectionId,
        },
        tokenId: {
          equals: tokenId as string,
        },
      },
    });

    res.status(200).json(token);
  } catch (error) {
    res.status(403).json(error);
  }
};

export default handler;
