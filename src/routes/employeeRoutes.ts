import express from "express";
import {
  getAllUsers,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeeController";
import tokenVerification from "../middlewares/tokenVerification/tokenVerification";
import { verifyAdmin } from "../middlewares/adminVerification/verifyAdmin";
import { employeeValidation } from "../middlewares/validators/employeeValidationMiddleware";

const employeeRoute = express.Router();

employeeRoute.use(tokenVerification);
employeeRoute.use(verifyAdmin);

employeeRoute.get("/all-employee", [employeeValidation], getAllUsers);
employeeRoute.post("/create-employee", [employeeValidation], addEmployee);
employeeRoute.put("/update-employee/:id", [employeeValidation], updateEmployee);
employeeRoute.delete(
  "/delete-employee/:id",
  [employeeValidation],
  deleteEmployee
);

export default employeeRoute;
