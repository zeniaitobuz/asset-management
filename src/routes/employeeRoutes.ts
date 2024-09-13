import express from "express";
import {
  getAllUsers,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeeController";
import tokenVerification from "../middlewares/tokenVerification/tokenVerification";
import { verifyAdmin } from "../middlewares/adminVerification/verifyAdmin";
import { employeeValidation } from "../middlewares/validators/employeeValidator";

const employeeRoute = express.Router();

employeeRoute.use(tokenVerification);
employeeRoute.use(verifyAdmin);
employeeRoute.use(employeeValidation);

employeeRoute.get("/all-employee", getAllUsers);
employeeRoute.post("/create-employee", addEmployee);
employeeRoute.put("/update-employee/:id", updateEmployee);
employeeRoute.delete(
  "/delete-employee/:id",
  [tokenVerification],
  deleteEmployee
);

export default employeeRoute;
