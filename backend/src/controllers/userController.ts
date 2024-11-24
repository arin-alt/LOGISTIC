import { Request, Response } from "express";
import { connectToDatabase } from "../database"; // MongoDB connection logic
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch users using Prisma
    const prismaUsers = await prisma.users.findMany();

    // Fetch users from MongoDB
    const db = await connectToDatabase();
    const mongoUsers = await db.collection("users").find().toArray();

    // Combine results (optional: customize the response format)
    res.json({
      source: "Prisma and MongoDB",
      prismaUsers,
      mongoUsers,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};
