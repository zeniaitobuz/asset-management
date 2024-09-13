import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tokenVerification: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Unauthorized access");
    }

    const [, token] = req.headers.authorization?.split(" ") as string[];

    if (!token) throw new Error("Token not found!");

    const decoded = <{ id: string }>(
      jwt.verify(token, config.JWT_SECRET as string)
    );

    if (!decoded) throw new Error("Invalid Token");

    const user = await prisma.employees.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) throw new Error("User not found!");

    req.body.user = user;

    return next();
  } catch (error) {
    next(error);
  }
};

export default tokenVerification;
