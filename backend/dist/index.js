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
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:8000" })); // Adjust frontend URL if needed
/* STATIC FILE SERVING */
const staticDir = path_1.default.resolve(__dirname, "static"); // Correct path for compiled files
console.log(`Static directory resolved at: ${staticDir}`);
app.use("/static", express_1.default.static(staticDir));
/* Endpoint to Serve JSON Files */
app.get("/expenseSummary.json", (req, res) => {
    const filePath = path_1.default.join(staticDir, "expenseSummary.json");
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
