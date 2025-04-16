import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getAccountBalance, transferMoneyController } from "../controllers/accountController";
import { transferMoneyValidation } from "../middlewares/zodValidation";

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, getAccountBalance);

accountRouter.post("/transferMoney", authMiddleware, transferMoneyValidation, transferMoneyController);

export { accountRouter };