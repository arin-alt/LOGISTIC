import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
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
        const expenseByCategorySumaryRaw = await prisma.products.findMany({
            take: 15, 
            orderBy: {
                stockQuantity: "desc", 
            },
        });
        const expenseByCategorySummary = expenseByCategorySumaryRaw.map((item) => ({
            ... item,
            amount: item.price.toString(),
        }));

        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
        })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving dashboard metrics"});
    }
};
