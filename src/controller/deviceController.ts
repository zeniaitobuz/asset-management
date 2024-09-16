import { Prisma, PrismaClient } from "@prisma/client";
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

// Create or Update a device
export const addOrUpdateDevice = async (
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
    deviceType,
    deviceName,
    deviceDescription,
    deviceAssignmentId,
    serialNo,
    assignee,
    isOutdated,
  } = req.body;

  try {
    let linkedEmployee;

    if (deviceAssignmentId) {
      let month = new Date().toLocaleDateString().split("/")[0];
      Number(month) < 10 ? (month = `0${month}`) : (month = month);
      const year = new Date().toLocaleDateString().split("/")[2].substring(2);
      if (
        deviceAssignmentId.substring(3, 5) !== month &&
        deviceAssignmentId.substring(4, 6) !== year
      ) {
        next(
          new Error(
            "The month and year of deviceAssignmentId needs to be the present month and year"
          )
        );
      }
    }

    if (assignee) {
      linkedEmployee = await prisma.employees.findUnique({
        where: {
          employeeEmail: assignee,
        },
      });
    }

    if (!linkedEmployee) {
      next(new Error("Assignee does not exist!"));
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
        deviceDescription,
        deviceAssignmentId,
        isOutdated,
      },
      create: {
        id,
        deviceType,
        deviceName,
        serialNo,
        assignee,
        employeeId: linkedEmployee?.id,
        deviceDescription,
        deviceAssignmentId,
        isOutdated,
      },
    });
    res.json({
      data: updatedDevice,
      message: `Device ${addOrUpdate} successfully`,
      success: true,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        next(new Error("Serial number will be unique!"));
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      if (
        error.message.includes(
          "Invalid value for argument `deviceType`. Expected Devices."
        )
      )
        next(
          new Error(
            "Device Type will have only 'Phone' 'Watch' 'IMac' 'MacMini' 'MacBook' keywords as values!"
          )
        );
    }
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
