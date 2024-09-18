import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import tokenGenerator from "../helpers/tokenGenerator";

const prisma = new PrismaClient();

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeEmail, employeePassword } = req.body;

    const employeeDetails = await prisma.employees.findUnique({
      where: {
        employeeEmail,
      },
    });

    if (!employeeDetails) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error("User not found!");
    }

    const id = employeeDetails.id.toString();
    let passwordMatches;

    if (employeeDetails.employeePassword) {
      passwordMatches = await bcryptjs.compare(
        employeePassword,
        employeeDetails.employeePassword
      );
    }
    console.log(passwordMatches);
    if (!passwordMatches) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Invalid Credentials!");
    }

    if (employeeDetails.employeeType !== "Admin") {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Invalid Action!");
    }

    const tokens = tokenGenerator({ id });

    const userWithSelectedFields = await prisma.employees.findUnique({
      where: {
        employeeEmail,
      },
      select: {
        employeeName: true,
        employeeEmail: true,
        employeePhone: true,
        employeeStatus: true,
      },
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Welcome Back",
      data: { user: { userWithSelectedFields, tokens } },
    });
  } catch (error) {
    next(error);
  }
};
