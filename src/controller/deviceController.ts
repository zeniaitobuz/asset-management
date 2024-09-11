import { devices, PrismaClient } from "@prisma/client";
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
    const addedDevice: devices = await prisma.devices.create({
      data: {
        deviceType: deviceType,
        deviceName: deviceName,
        serialNo: serialNo,
        assignee: assignee,
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
    const updatedDevice: devices = await prisma.devices.upsert({
      where: { id: id },
      update: {
        deviceType: deviceType,
        deviceName: deviceName,
        serialNo: serialNo,
        assignee: assignee,
        updatedAt: new Date(),
      },
      create: {
        deviceType: deviceType,
        deviceName: deviceName,
        serialNo: serialNo,
        assignee: assignee,
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
    const deletedDevice: devices = await prisma.devices.delete({
      where: { id: id },
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
