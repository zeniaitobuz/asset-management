import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllDevices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allDevices = await prisma.devices.findMany();
    res.json({
      data: allDevices,
      success: true,
      message: "Devices fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Create a new device
export const addDevice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { deviceType, deviceName, serialNo, assignee } = req.body;
  try {
    let linkedEmployee;

    if (assignee) {
      linkedEmployee = await prisma.employees.findUnique({
        where: {
          employeeEmail: assignee,
        },
      });
    }

    const addedDevice = await prisma.devices.create({
      data: {
        deviceType,
        deviceName,
        serialNo,
        assignee,
        employeeId: linkedEmployee?.id,
      },
    });

    res.json({
      data: addedDevice,
      message: "Device added successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Update a device
export const updateDevice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { deviceType, deviceName, serialNo, assignee } = req.body;
  try {
    let linkedEmployee;

    if (assignee) {
      linkedEmployee = await prisma.employees.findUnique({
        where: {
          employeeEmail: assignee,
        },
      });
    }

    const updatedDevice = await prisma.devices.upsert({
      where: { id },
      update: {
        deviceType,
        deviceName,
        serialNo,
        assignee,
        employeeId: linkedEmployee?.id,
        updatedAt: new Date(),
      },
      create: {
        deviceType,
        deviceName,
        serialNo,
        assignee,
        employeeId: linkedEmployee?.id,
      },
    });
    res.json({
      data: updatedDevice,
      message: "Device updated successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a device
export const deleteDevice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deletedDevice = await prisma.devices.delete({
      where: { id },
    });
    res.json({
      data: deletedDevice,
      message: "Employee deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
