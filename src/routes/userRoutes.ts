import express from "express";
import {
  getAllUsers,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeeController";

const userRoute = express.Router();

userRoute.get("/all-employee", getAllUsers);
userRoute.post("/create-employee", addEmployee);
userRoute.put("/update-employee/:id", updateEmployee);
userRoute.delete("/delete-employee/:id", deleteEmployee);

export default userRoute;
