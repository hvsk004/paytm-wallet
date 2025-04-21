import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken"; // Make sure to import this
import { UserIdRequest } from "../types";

// Create an interface that extends JwtPayload to include userId
interface UserPayload extends JwtPayload {
  userId: string;
}

/**
 * Authentication middleware that verifies JWT tokens
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export function authMiddleware(
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Check if authorization header exists
    const authHeader = (
      req.headers as unknown as Record<string, string | undefined>
    )["authorization"];
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Authentication required. No token provided.",
      });
      return;
    }

    // Extract token from header
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Invalid token format. Bearer token required.",
      });
      return;
    }

    // Verify token
    try {
      const decoded = verifyToken(token) as UserPayload; // Type assertion here
      if (!decoded || !decoded.userId) {
        res.status(403).json({
          success: false,
          message: "Invalid or expired token.",
        });
        return;
      }
      req.userId = decoded.userId;
      next(); // Call the next function
    } catch (err) {
      res.status(403).json({
        success: false,
        message: "Token verification failed.",
      });
      return;
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
    return;
  }
}
