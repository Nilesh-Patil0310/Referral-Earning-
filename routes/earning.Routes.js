import express from "express";
import { getEarnings } from "../controllers/earningController.js";

const earningRouter = express.Router();

earningRouter.get("/earnings/:userId", getEarnings);

export default earningRouter;
