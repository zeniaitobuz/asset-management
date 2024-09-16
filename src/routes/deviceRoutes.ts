import express from "express";
import {
  getAllDevices,
  addDevice,
  updateDevice,
  deleteDevice,
} from "../controller/deviceController";
import tokenVerification from "../middlewares/tokenVerification/tokenVerification";
import { verifyAdmin } from "../middlewares/adminVerification/verifyAdmin";
import { deviceValidation } from "../middlewares/validators/deviceValidationMiddleware";

const deviceRoutes = express.Router();

deviceRoutes.use(tokenVerification);
deviceRoutes.use(verifyAdmin);

deviceRoutes.get("/all-devices", getAllDevices);
deviceRoutes.post("/create-device", [deviceValidation], addDevice);
deviceRoutes.put("/update-device/:id", [deviceValidation], updateDevice);
deviceRoutes.delete("/delete-device/:id", [deviceValidation], deleteDevice);

export default deviceRoutes;
