import { TokenApiPayload } from "app/types";
import { db } from "app/utils/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const payload: TokenApiPayload = req.body;
    await db.$connect();

    const token = await db.token.create({
      data: payload,
    });

    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;
