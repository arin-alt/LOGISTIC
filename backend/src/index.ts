import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

/* CONFIGURATIONS */
dotenv.config();
const app = express();

// Middleware for logging incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Common middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000", // Dynamic frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
      const status = (err as any).status || 404;
      res.status(status).send("File not found");
    }
  });
});

/* ROUTES (Example: API Routes Placeholder) */
// Import and use API routes here
// Example:
import productRoutes from "./routes/productRoutes";
app.use("/api/v1/products", productRoutes);


/* ERROR HANDLING */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Unhandled error: ${err.message}`);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

/* SERVER */
const port = Number(process.env.PORT) || 8000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
