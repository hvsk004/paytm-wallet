import express from "express";
import { userLoginValidation, userSignUpValidation, userUpdateValidation } from "../middlewares/zodValidation";
import { loginController, signUpController, updateUser } from "../controllers/userControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/signup", userSignUpValidation, signUpController);

userRouter.post("/login", userLoginValidation, loginController);

userRouter.post("/updateUser", authMiddleware, userUpdateValidation, updateUser);


export { userRouter };