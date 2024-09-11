import express from "express";
import {
  getAllDevices,
  addDevice,
  updateDevice,
  deleteDevice,
} from "../controller/deviceController";

const deviceRoutes = express.Router();

deviceRoutes.get("/all-devices", getAllDevices);
deviceRoutes.post("/create-device", addDevice);
deviceRoutes.put("/update-device/:id", updateDevice);
deviceRoutes.delete("/delete-device/:id", deleteDevice);

export default deviceRoutes;
