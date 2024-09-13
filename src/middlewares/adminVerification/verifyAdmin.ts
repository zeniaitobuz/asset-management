import { employees } from "@prisma/client";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const verifyAdmin: RequestHandler = (req, res, next) => {
  try {
    const { user } = req.body as { user: employees };

    if (user.employeeType !== "admin") {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Unauthorized");
    }

    next();
  } catch (error) {
    next(error);
  }
};
