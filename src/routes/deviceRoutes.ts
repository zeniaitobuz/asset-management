import express from "express";
import {
  getAllDevices,
  addOrUpdateDevice,
  deleteDevice,
} from "../controller/deviceController";
import tokenVerification from "../middlewares/tokenVerification/tokenVerification";
import { verifyAdmin } from "../middlewares/adminVerification/verifyAdmin";
import { deviceValidation } from "../middlewares/validators/deviceValidationMiddleware";

const deviceRoutes = express.Router();

deviceRoutes.use(tokenVerification);
deviceRoutes.use(verifyAdmin);

deviceRoutes.get("/all-devices", getAllDevices);
deviceRoutes.post("/create-device", [deviceValidation], addOrUpdateDevice);
deviceRoutes.put("/update-device/:id", [deviceValidation], addOrUpdateDevice);
deviceRoutes.delete("/delete-device/:id", deleteDevice);

export default deviceRoutes;
