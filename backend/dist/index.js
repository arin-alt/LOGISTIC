"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware for logging incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// Common middleware
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
// CORS configuration
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8000", // Dynamic frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
/* STATIC FILE SERVING */
const staticDir = path_1.default.resolve("src", "static");
app.use("/static", express_1.default.static(staticDir));
/* Endpoint to Serve JSON Files */
app.get("/expenseSummary.json", (req, res) => {
    const filePath = path_1.default.join(staticDir, "expenseSummary.json");
    console.log(`Serving file: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error serving file: ${err.message}`);
            const status = err.status || 404;
            res.status(status).send("File not found");
        }
    });
});
/* ROUTES */
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
// Register all routes with proper prefixes
app.use("/api/v1/dashboard", dashboardRoutes_1.default);
app.use("/api/v1/products", productRoutes_1.default);
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/expenses", expenseRoutes_1.default);
/* ERROR HANDLING */
app.use((err, req, res, next) => {
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
