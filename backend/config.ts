import "dotenv/config";
export const DB_URL: string =
  process.env.DB_URL || "mongodb://localhost:27017/paytm";
export const JWT_SECRET: string = process.env.JWT_SECRET || "default@123";
export const NODE_ENV: string = process.env.NODE_ENV || "dev";
export const FRONTEND_URL: string =
  process.env.FRONTEND_URL || "https://paytm-wallet-swart.vercel.app";
