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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDashboardMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        const db = yield (0, database_1.connectToDatabase)();
        // Fetch data using MongoDB
        const expenseByCategorySummaryRaw = yield db.collection("products").find().toArray();
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => (Object.assign(Object.assign({}, item), { amount: item.price.toString() })));
        // Fetch data using Prisma
        const popularProducts = yield prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: "desc",
            },
        });
        const salesSummary = yield prisma.products.findMany({
            take: 5,
            orderBy: {
                stockQuantity: "desc",
            },
        });
        const purchaseSummary = yield prisma.products.findMany({
            take: 5,
            orderBy: {
                stockQuantity: "desc",
            },
        });
        const expenseSummary = yield prisma.products.findMany({
            take: 5,
            orderBy: {
                stockQuantity: "desc",
            },
        });
        // Send the combined response
        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
        });
    }
    catch (error) {
        console.error("Error retrieving dashboard metrics:", error);
        res.status(500).json({ message: "Error retrieving dashboard metrics" });
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
