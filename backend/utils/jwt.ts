import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

function createToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1w" });
}

function verifyToken(token: string) {
    try {
        const result = jwt.verify(token, JWT_SECRET);
        return result;
    } catch (err) {
        return {
            error: "Failed to verify JWT."
        }
    }
}
export { createToken, verifyToken };
