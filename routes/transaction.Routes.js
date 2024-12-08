import express from "express";
import { createTransaction } from "../controllers/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.post("/transactions", createTransaction);

export default transactionRouter;
