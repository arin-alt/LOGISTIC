import { Request, Response } from "express";
import { connectToDatabase } from "../database"; // MongoDB connection logic
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase();

    // Fetch data from MongoDB
    const expenseByCategorySummaryRaw = await db
      .collection("expenseByCategory")
      .find({})
      .sort({ date: -1 }) // Sort by date descending
      .toArray();

    // Map and format the results
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.json(expenseByCategorySummary);
  } catch (error) {
    console.error("Error retrieving expenses by category:", error);
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};
