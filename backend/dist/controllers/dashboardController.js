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
exports.getDashboardMetrics = void 0;
const database_1 = require("../database");
const getDashboardMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.connectToDatabase)();
        const popularProducts = yield db.collection("products").find().limit(5).toArray();
        const salesSummary = yield db.collection("sales").find().toArray();
        const purchaseSummary = yield db.collection("purchases").find().toArray();
        const expenseSummary = yield db.collection("expenses").find().toArray();
        res.json({ popularProducts, salesSummary, purchaseSummary, expenseSummary });
    }
    catch (err) {
        console.error("Error fetching dashboard metrics:", err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
