import express from "express";
import { router as apiRouter } from "./routes/index"
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response } from "express";


const app = express();

// const corsOptions = {
//     ["http://localhost:5173"],
//     credentials: true,
// };

app.use(cors());
app.use(bodyParser.json());


app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
        message: "OK",
        currentTime: new Date(),
    })
})

app.use("/api/v1", apiRouter);

const PORT = process.env.PORT;

app.listen(PORT || 3210, function () {
    console.log(`Listening on Port ${PORT}`);
});



