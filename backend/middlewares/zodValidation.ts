import zod from "zod";
import { Request, Response, NextFunction } from "express";
import { LoginInput, SignupInput, UpdateInput, UserIdRequest } from "../types";

const userSignUpSchema = zod.object({
  username: zod.string().email({ message: "Invalid Email" }),
  firstName: zod.string().min(1, { message: "First Name cannot be empty" }),
  lastName: zod.string().min(1, { message: "Last Name cannot be empty" }),
  password: zod
    .string()
    .min(7, { message: "Password must be at least 7 characters" }),
});

const userLoginSchema = zod.object({
  username: zod.string().email({ message: "Invalid Email" }),
  password: zod.string(),
});

const userUpdateSchema = zod
  .object({
    firstName: zod
      .string()
      .min(1, { message: "First Name cannot be empty" })
      .optional(),
    lastName: zod
      .string()
      .min(1, { message: "Last Name cannot be empty" })
      .optional(),
    password: zod
      .string()
      .min(7, { message: "Password must be at least 7 characters" })
      .optional(),
  })
  .refine((data) => data.firstName || data.lastName || data.password, {
    message: "At least one field must be provided",
  });

const transferMoneySchema = zod.object({
  userId: zod.string({ message: "userId is missing" }),
  toId: zod.string({ message: "toId is missing" }),
  amount: zod
    .number({ message: "amount is missing" })
    .min(1, { message: "Minimum amount should be 1." }),
});

export const userSignUpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const input: SignupInput = req.body;
  const result = userSignUpSchema.safeParse(input);
  if (result.success) next();
  else {
    res.status(400).json({
      error: result.error.errors,
      message: "Invalid Inputs",
    });
  }
};

export const userLoginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const input: LoginInput = req.body;
  const result = userLoginSchema.safeParse(input);
  if (result.success) next();
  else {
    res.status(400).json({
      error: result.error.errors,
      message: "Invalid Inputs",
    });
  }
};

export const userUpdateValidation = (
  req: Request & UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const input: UpdateInput = req.body;
  const result = userUpdateSchema.safeParse(input);
  if (result.success) next();
  else {
    res.status(400).json({
      error: result.error.errors,
      message: "Invalid Inputs",
    });
  }
};

export const transferMoneyValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const input = req.body;
  const result = transferMoneySchema.safeParse(input);
  if (result.success) next();
  else {
    res.status(400).json({
      message: "Invalid Inputs",
    });
  }
};
