import express from "express";
import {
  getAllUsers,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeeController";
import tokenVerification from "../middlewares/tokenVerification";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const employeeRoute = express.Router();

employeeRoute.use(tokenVerification);
employeeRoute.use(verifyAdmin);

employeeRoute.get("/all-employee", getAllUsers);
employeeRoute.post("/create-employee", addEmployee);
employeeRoute.put("/update-employee/:id", updateEmployee);
employeeRoute.delete(
  "/delete-employee/:id",
  [tokenVerification],
  deleteEmployee
);

export default employeeRoute;
