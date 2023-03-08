import { CollectionApiPayload } from "app/types";
import { db } from "app/utils/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST")
    res.status(403).json({ error: "Only POST method is allowed" });

  try {
    const payload: CollectionApiPayload = req.body;
    await db.$connect;
    const collection = await db.collection.create({
      data: payload,
    });

    res.status(200).json(collection);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;
