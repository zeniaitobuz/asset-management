import express from "express";
import {
  getAllDevices,
  addDevice,
  updateDevice,
  deleteDevice,
} from "../controller/deviceController";
import tokenVerification from "../middlewares/tokenVerification/tokenVerification";
import { verifyAdmin } from "../middlewares/adminVerification/verifyAdmin";

const deviceRoutes = express.Router();

deviceRoutes.use(tokenVerification);
deviceRoutes.use(verifyAdmin);

deviceRoutes.get("/all-devices", getAllDevices);
deviceRoutes.post("/create-device", addDevice);
deviceRoutes.put("/update-device/:id", updateDevice);
deviceRoutes.delete("/delete-device/:id", deleteDevice);

export default deviceRoutes;
