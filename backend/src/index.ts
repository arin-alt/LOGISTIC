import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

/* CONFIGURATIONS */
dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(
  cors({ 
    origin: "http://localhost:8000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
  })
); // Adjust frontend URL if needed

/* STATIC FILE SERVING */
const staticDir = path.resolve("src", "static");
app.use("/static", express.static(staticDir));

/* Endpoint to Serve JSON Files */
app.get("/expenseSummary.json", (req, res) => {
    const filePath = path.join(staticDir, "expenseSummary.json");
    console.log(`Serving file: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error serving file: ${err.message}`);
            res.status(404).send("File not found");
        }
    });
});

/* SERVER */
const port = Number(process.env.PORT) || 8000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
});
