import { Request, Response } from "express";
import { LoginInput, SignupInput } from "../types";
import { User, Account } from "../db";
import { createToken } from "../utils/jwt";
import { UserIdRequest } from "../types";

async function signUpController(req: Request, res: Response) {
  const user: SignupInput = req.body;

  try {
    const existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
      res.status(411).json({
        message: "User with Email already exists.",
      });
      return;
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server error could not validate email.",
    });
    return;
  }

  try {
    const newUser = new User(user);
    await newUser.save();

    const account = {
      userId: newUser.userId,
      balance: Math.floor(Math.random() * (10000 - 1000)) + 1000,
    };

    const newAccount = new Account(account);
    newAccount.save();

    res.status(201).json({
      message: "User Account Created successfully",
    });
    return;
  } catch (err) {
    res.status(500).json({
      message: "Internal server error Failed to create user",
    });
    return;
  }
}

async function loginController(req: Request, res: Response) {
  const { username, password }: LoginInput = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(400).json({
        message: "User Not Found.",
      });
      return;
    } else {
      const result = await user.comparePassword(password);

      if (!result) {
        res.status(400).json({
          message: "Invalid Credentials",
        });
        return;
      }

      const newJWT = createToken(user.userId);

      res.status(200).json({
        message: "Login Successful",
        jwt: newJWT,
      });
      return;
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error Login Failed",
    });
    return;
  }
}

async function updateUser(req: Request & UserIdRequest, res: Response) {
  const userId = req.userId;
  try {
    const user = await User.findOne({
      userId: userId,
    });

    if (!user) {
      res.status(401).json({ message: "Invalid UserID" });
      return;
    }

    if (req.body?.firstName) user.firstName = req.body.firstName;
    if (req.body?.lastName) user.lastName = req.body.lastName;
    if (req.body?.password) user.password = req.body.password;

    await user.save();

    res.status(200).json({
      message: "User details updated successfully",
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error, Failed to update User details.",
    });
    return;
  }
}

async function getUsersByName(req: Request & UserIdRequest, res: Response) {
  const name = req.query.name as string | undefined;
  if (!name) {
    res.status(400).json({
      message: "Invalid filter.",
    });
    return;
  }

  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ],
    });

    res.status(200).json({
      message: "Users Fetched.",
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
    });
    return;
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error, Could not fetch users",
    });
    return;
  }
}

async function getUser(req: Request & UserIdRequest, res: Response) {
  const userId = req.userId;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      res.status(401).json({
        message: "User Not found",
      });
      return;
    }
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.username,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error, failed to get user details",
    });
  }
}

export {
  signUpController,
  loginController,
  updateUser,
  getUsersByName,
  getUser,
};
