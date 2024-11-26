import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

// Import routes
import dashboardRoutes from "./routes/dashboardRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";

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
    origin: "http://localhost:3000", // Adjust frontend URL if needed
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
      res.status(404).send("File not found");
    }
  });
});

/* ROUTES */
// Register all routes with proper prefixes
app.use("/dashboard", dashboardRoutes);
app.use("/api", expenseRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

app._router.stack.forEach((middleware: any) => {
  if (middleware.route) {
    console.log(middleware.route.path);
  }
});


/* SERVER */
const port = Number(process.env.PORT) || 8000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
