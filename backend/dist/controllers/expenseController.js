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
exports.getExpensesByCategory = exports.getExpenses = void 0;
const database_1 = require("../database");
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.connectToDatabase)();
        const expenses = yield db.collection("expenses").find().toArray();
        res.json(expenses);
    }
    catch (err) {
        console.error("Error fetching expenses:", err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getExpenses = getExpenses;
const getExpensesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.connectToDatabase)();
        const expensesByCategory = yield db.collection("expensesByCategory").find().toArray();
        res.json(expensesByCategory);
    }
    catch (err) {
        console.error("Error fetching expenses by category:", err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getExpensesByCategory = getExpensesByCategory;
