import express from "express";
import {
  getAllUsers,
  deleteEmployee,
  addOrUpdateEmployee,
} from "../controller/employeeController";
import tokenVerification from "../middlewares/tokenVerification/tokenVerification";
import { verifyAdmin } from "../middlewares/adminVerification/verifyAdmin";
import { employeeValidation } from "../middlewares/validators/employeeValidationMiddleware";

const employeeRoute = express.Router();

employeeRoute.use(tokenVerification);
employeeRoute.use(verifyAdmin);

employeeRoute.get("/all-employee", getAllUsers);
employeeRoute.post(
  "/create-employee",
  [employeeValidation],
  addOrUpdateEmployee
);
employeeRoute.put(
  "/update-employee/:id",
  [employeeValidation],
  addOrUpdateEmployee
);
employeeRoute.delete(
  "/delete-employee/:id",
  [employeeValidation],
  deleteEmployee
);

export default employeeRoute;
