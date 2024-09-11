import express from "express";
import {
  getAllUsers,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeeController";

const employeeRoute = express.Router();

employeeRoute.get("/all-employee", getAllUsers);
employeeRoute.post("/create-employee", addEmployee);
employeeRoute.put("/update-employee/:id", updateEmployee);
employeeRoute.delete("/delete-employee/:id", deleteEmployee);

export default employeeRoute;
