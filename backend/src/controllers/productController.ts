import { Request, Response } from "express";
import { connectToDatabase } from "../database"; // MongoDB connection logic
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();

    // Fetch products using Prisma
    const prismaProducts = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    // Fetch products from MongoDB (optional)
    const db = await connectToDatabase();
    const mongoProducts = await db
      .collection("products")
      .find({
        name: { $regex: search || "", $options: "i" }, // Case-insensitive search
      })
      .toArray();

    res.json({
      source: "Prisma and MongoDB",
      prismaProducts,
      mongoProducts,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;

    // Create product using Prisma
    const prismaProduct = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });

    // Optionally store the same product in MongoDB
    const db = await connectToDatabase();
    const mongoResult = await db.collection("products").insertOne({
      productId,
      name,
      price,
      rating,
      stockQuantity,
    });

    res.status(201).json({
      message: "Product created successfully in Prisma and MongoDB",
      prismaProduct,
      mongoResult,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};
