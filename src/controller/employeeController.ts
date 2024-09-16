import { employees, Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allEmployees = await prisma.employees.findMany();
    res.json({
      data: allEmployees,
      success: true,
      message: "Employees fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Create or Update a user
export const addOrUpdateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id } = req.params;
  let addOrUpdate = "updated";

  if (!id) {
    id = crypto.randomUUID();
    addOrUpdate = "added";
  }

  const {
    employeeName,
    employeeEmail,
    employeePhone,
    employeeTeam,
    employeeStatus,
  } = req.body;
  try {
    const updatedEmployee: employees = await prisma.employees.upsert({
      where: { id: id },
      update: {
        employeeName,
        employeeEmail,
        employeePhone,
        employeeTeam,
        employeeStatus,
        updatedAt: new Date(),
      },
      create: {
        id,
        employeeName,
        employeeEmail,
        employeePhone,
        employeeTeam,
        employeeStatus,
      },
    });
    res.json({
      data: updatedEmployee,
      message: `Employee ${addOrUpdate} successfully`,
      success: true,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        next(new Error("Employee Email will be unique!"));
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      if (
        error.message.includes(
          "Invalid value for argument `employeeStatus`. Expected EmployeeStatus."
        )
      )
        next(
          new Error(
            "Employee Status will have only 'Active' and 'Inactive' keywords as values!"
          )
        );
    }
    next(error);
  }
};

// Delete a user
export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deletedEmployee: employees = await prisma.employees.delete({
      where: { id: id },
    });
    res.json({
      data: deletedEmployee,
      message: "Employee deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
