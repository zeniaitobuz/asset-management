import { employees, Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      employeeName,
      employeeEmail,
      employeePhone,
      employeeTeam,
      employeeStatus,
      isDeleted,
      page = "1",
      limit = "10",
    } = req.query;

    const searchFilters: any = {};

    const skip = (Number(page) - 1) * Number(limit);

    if (employeeName) {
      searchFilters.employeeName = {
        contains: employeeName as string,
        mode: "insensitive",
      };
    }
    if (employeeEmail) {
      searchFilters.employeeEmail = {
        contains: employeeEmail as string,
        mode: "insensitive",
      };
    }
    if (employeePhone) {
      searchFilters.employeePhone = {
        contains: employeePhone as string,
        mode: "insensitive",
      };
    }
    if (employeeTeam) {
      searchFilters.employeeTeam = {
        contains: employeeTeam as string,
        mode: "insensitive",
      };
    }
    if (employeeStatus) {
      searchFilters.employeeStatus = {
        contains: employeeStatus as string,
        mode: "insensitive",
      };
    }
    if (isDeleted) {
      searchFilters.isDeleted = {
        contains: isDeleted as string,
        mode: "insensitive",
      };
    }

    const allEmployees = await prisma.employees.findMany({
      where: searchFilters,
      skip,
      take: Number(limit),
    });

    const totalEmployees = await prisma.employees.count({
      where: searchFilters,
    });

    const totalPages = Math.ceil(totalEmployees / Number(limit));

    res.json({
      data: allEmployees,
      success: true,
      message: "Employees fetched successfully",
      pagination: {
        totalEmployees,
        totalPages,
        currentPage: Number(page),
        limit,
      },
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
      ) {
        next(
          new Error(
            "Employee Status will have only 'Active' and 'Inactive' keywords as values!"
          )
        );
      }
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
    const deletedEmployee: employees = await prisma.employees.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
        isDeleted: true,
      },
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
