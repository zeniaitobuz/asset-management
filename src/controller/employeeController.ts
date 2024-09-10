import { employees, PrismaClient } from "@prisma/client";
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

// Create a new user
export const addEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { employeeName, employeeEmail, employeePhone, employeeTeam } = req.body;
  try {
    const addedEmployee: employees = await prisma.employees.create({
      data: {
        employeeName: String(employeeName),
        employeeEmail: String(employeeEmail),
        employeePhone: String(employeePhone),
        employeeTeam: String(employeeTeam),
      },
    });
    res.json({
      data: addedEmployee,
      message: "Employee created successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Update a user
export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { employeeName, employeeEmail, employeePhone, employeeTeam } = req.body;
  try {
    const updatedEmployee: employees = await prisma.employees.upsert({
      where: { id: id },
      update: {
        employeeName: String(employeeName),
        employeeEmail: String(employeeEmail),
        employeePhone: String(employeePhone),
        employeeTeam: String(employeeTeam),
        updatedAt: new Date(),
      },
      create: {
        employeeName: String(employeeName),
        employeeEmail: String(employeeEmail),
        employeePhone: String(employeePhone),
        employeeTeam: String(employeeTeam),
      },
    });
    res.json({
      data: updatedEmployee,
      message: "Employee updated successfully",
      success: true,
    });
  } catch (error) {
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
