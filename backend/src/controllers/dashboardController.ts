import { Request, Response } from "express";
import { connectToDatabase } from "../database";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
        // Connect to MongoDB
        const db = await connectToDatabase();

        // Fetch data using MongoDB
        const expenseByCategorySummaryRaw = await db.collection("products").find().toArray();
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
            ...item,
            amount: item.price.toString(),
        }));

        // Fetch data using Prisma
        const popularProducts = await prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: "desc",
            },
        });
        const salesSummary = await prisma.products.findMany({
            take: 5,
            orderBy: {
                stockQuantity: "desc",
            },
        });
        const purchaseSummary = await prisma.products.findMany({
            take: 5,
            orderBy: {
                stockQuantity: "desc",
            },
        });
        const expenseSummary = await prisma.products.findMany({
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
    } catch (error) {
        console.error("Error retrieving dashboard metrics:", error);
        res.status(500).json({ message: "Error retrieving dashboard metrics" });
    }
};
