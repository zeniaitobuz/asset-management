import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import employeeRoute from "./routes/employeeRoutes";
import deviceRoutes from "./routes/deviceRoutes";
import authRouter from "./routes/authRoutes";
const app = express();
const prisma = new PrismaClient();
import cors from "cors";

app.use(express.json());

app.use(authRouter);
app.use(employeeRoute);
app.use(deviceRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(cors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message, success: false });
  console.error(err);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
