import express from "express";
import {
  userLoginValidation,
  userSignUpValidation,
  userUpdateValidation,
} from "../middlewares/zodValidation";
import {
  getUser,
  loginController,
  signUpController,
  updateUser,
} from "../controllers/userControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/signup", userSignUpValidation, signUpController);

userRouter.post("/login", userLoginValidation, loginController);

userRouter.post(
  "/updateUser",
  authMiddleware,
  userUpdateValidation,
  updateUser
);

userRouter.get("/getUser", authMiddleware, getUser);

export { userRouter };
