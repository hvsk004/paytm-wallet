import express from "express";
import { router as apiRouter } from "./routes/index"
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { resolveSoa } from "dns";


const app = express();

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL || "https://paytm-wallet-swart.vercel.app"] 
        : ["http://localhost:5173", "https://paytm-wallet-swart.vercel.app"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
        message: "OK",
        currentTime: new Date(),
    })
})

app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("<h1>Hello World</h1>")
})

app.use("/api/v1", apiRouter);

const PORT = process.env.PORT;

app.listen(PORT || 3210, function () {
    console.log(`Listening on Port ${PORT}`);
});



