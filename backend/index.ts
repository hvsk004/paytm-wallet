import express from "express";
import { router as apiRouter } from "./routes/index";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { NODE_ENV, FRONTEND_URL } from "./config";

const app = express();

app.set("trust proxy", 1);

const corsOptions = {
  origin:
    NODE_ENV === "production"
      ? FRONTEND_URL
      : ["http://localhost:5173", "https://paytm-wallet-swart.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "OK",
    currentTime: new Date(),
  });
});

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("<h1>Hello World</h1>");
});

app.use("/api/v1", apiRouter);

const PORT = process.env.PORT;

app.listen(PORT || 3210, function () {
  console.log(`Listening on Port ${PORT}`);
});
