import express, { Request, Response, NextFunction } from "express";
import employeeRoute from "./routes/employeeRoutes";
import deviceRoutes from "./routes/deviceRoutes";
import authRouter from "./routes/authRoutes";
import cors from "cors";
import logger from "./middlewares/logger/loggerMiddleware";
import historyRoutes from "./routes/historyRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(logger);

app.use(authRouter);
app.use(employeeRoute);
app.use(deviceRoutes);
app.use(historyRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message, success: false });
  console.error(err);
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server is running on http://localhost:4000");
});
