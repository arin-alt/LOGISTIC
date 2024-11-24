"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpensesByCategory = void 0;
const database_1 = require("../database"); // MongoDB connection logic
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getExpensesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        const db = yield (0, database_1.connectToDatabase)();
        // Fetch data from MongoDB
        const expenseByCategorySummaryRaw = yield db
            .collection("expenseByCategory")
            .find({})
            .sort({ date: -1 }) // Sort by date descending
            .toArray();
        // Map and format the results
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => (Object.assign(Object.assign({}, item), { amount: item.amount.toString() })));
        res.json(expenseByCategorySummary);
    }
    catch (error) {
        console.error("Error retrieving expenses by category:", error);
        res.status(500).json({ message: "Error retrieving expenses by category" });
    }
});
exports.getExpensesByCategory = getExpensesByCategory;
