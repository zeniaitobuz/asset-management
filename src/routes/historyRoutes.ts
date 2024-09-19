import express from "express";
import { getHistory, deleteHistory } from "../controller/historyController";
import tokenVerification from "../middlewares/tokenVerification/tokenVerification";
import { verifyAdmin } from "../middlewares/adminVerification/verifyAdmin";

const historyRoutes = express.Router();

historyRoutes.use(tokenVerification);
historyRoutes.use(verifyAdmin);

historyRoutes.get("/all-history", getHistory);
historyRoutes.get("/delete-history/:id", deleteHistory);

export default historyRoutes;
