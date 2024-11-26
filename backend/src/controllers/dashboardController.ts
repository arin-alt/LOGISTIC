import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const convertBigIntToString = (data: any) =>
  JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: { stockQuantity: "desc" },
    });

    const salesSummary = await prisma.sales.findMany({
      take: 5,
      orderBy: { timestamp: "desc" },
    });

    const purchaseSummary = await prisma.purchases.findMany({
      take: 5,
      orderBy: { timestamp: "desc" },
    });

    const expenseSummary = await prisma.expenses.findMany({
      take: 5,
      orderBy: { timestamp: "desc" },
    });

    const expenseByCategorySummary = await prisma.expenseByCategory.findMany({
      take: 15,
      orderBy: { date: "desc" },
    });

    res.json({
      popularProducts: convertBigIntToString(popularProducts),
      salesSummary: convertBigIntToString(salesSummary),
      purchaseSummary: convertBigIntToString(purchaseSummary),
      expenseSummary: convertBigIntToString(expenseSummary),
      expenseByCategorySummary: convertBigIntToString(expenseByCategorySummary),
    });
  } catch (error) {
    console.error("Error retrieving dashboard metrics:", error);
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
