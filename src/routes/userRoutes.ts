import express from "express";
import {
  getAllUsers,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/userController";

const userRoute = express.Router();

userRoute.get("/all-employee", getAllUsers);
userRoute.post("/create-employee", createEmployee);
userRoute.put("/update-employee/:id", updateEmployee);
userRoute.delete("/delete-employee/:id", deleteEmployee);
export default userRoute;
