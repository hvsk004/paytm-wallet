import { Request, Response } from "express";
import { Account } from "../db";
import mongoose from "mongoose";

async function getAccountBalance(req: Request, res: Response) {
  const userId = req.body.userId;

  const userAccount = await Account.findOne({
    userId,
  });

  if (!userAccount) {
    res.status(400).json({
      message: "Account Not found",
    });
    return;
  }

  res.status(200).json({
    balance: userAccount.balance,
  });
  return;
}

async function transferMoneyController(req: Request, res: Response) {
  const { userId, toId, amount } = req.body;
  if (amount <= 0) {
    res.status(400).json({ message: "Amount must be positive" });
    return;
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const userAccount = await Account.findOne({ userId }).session(session);
    const toUserAccount = await Account.findOne({ userId: toId }).session(
      session
    );

    if (!userAccount || !toUserAccount) {
      await session.abortTransaction();
      res.status(400).json({ message: "Invalid Account" });
      return;
    }

    if (userAccount.balance < amount) {
      await session.abortTransaction();
      res.status(400).json({ message: "Insufficient Balance." });
      return;
    }

    userAccount.balance -= amount;
    toUserAccount.balance += amount;

    await userAccount.save({ session });
    await toUserAccount.save({ session });

    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successful" });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({
      message: "Internal Server Error, Transaction Failed",
      error: err,
    });
  } finally {
    session.endSession();
  }
}

export { getAccountBalance, transferMoneyController };
