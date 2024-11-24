import { PrismaClient, Prisma } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// Define a type for model names based on PrismaClient keys (excluding non-model methods)
type ModelName = keyof Omit<typeof prisma, '$connect' | '$disconnect' | '$executeRaw' | '$queryRaw' | '$transaction' | '$on'>;

// Check if the model name is a valid Prisma model
async function isPrismaModel(name: string): Promise<boolean> {
  const models: ModelName[] = [
    "products",
    "expenseSummary",
    "sales",
    "salesSummary",
    "purchases",
    "purchaseSummary",
    "users",
    "expenses",
    "expenseByCategory",
  ];
  return models.includes(name as ModelName);
}

// Validate data against specific criteria for each model
async function validateData(modelName: ModelName, data: any): Promise<void> {
  console.log(`Validating data for model ${modelName as string}`);
  // Implement actual validation logic here, e.g., using Joi or Zod
}

// Function to seed data from a JSON file to the specified Prisma model
async function seedData(fileName: string, modelName: ModelName): Promise<void> {
  const filePath = path.resolve(__dirname, "seedData", fileName);
  const jsonData = await fs.readFile(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  if (!(await isPrismaModel(modelName as string))) {
    console.error(`No Prisma model matches the file name: ${fileName}`);
    return;
  }

  const model = prisma[modelName as keyof typeof prisma]; // Access the Prisma model dynamically

  for (const data of parsedData) {
    try {
      await validateData(modelName, data);
      await (model as any).create({ data });
    } catch (error) {
      handlePrismaError(error, modelName as string);
    }
  }

  console.log(`Seeded ${modelName as string} with data from ${fileName}`);
}

// Function to delete all data from models before seeding
async function deleteAllData(fileNames: string[]): Promise<void> {
  const modelsToDelete: ModelName[] = [
    "products",
    "expenseSummary",
    "sales",
    "salesSummary",
    "purchases",
    "purchaseSummary",
    "users",
    "expenses",
    "expenseByCategory",
  ];

  for (const fileName of fileNames) {
    const modelName = path.basename(fileName, path.extname(fileName)) as ModelName;
    
    if (modelsToDelete.includes(modelName)) {
       // Use type assertion to indicate the type of model
       const model = prisma[modelName as keyof typeof prisma];
       await (model as any).deleteMany(); // Now TypeScript should recognize the method
       console.log(`Deleted all data from ${modelName as string}`);
    }
  }
}

// Handle different types of Prisma errors
function handlePrismaError(error: unknown, modelName: string) {
  if (error instanceof Prisma.PrismaClientValidationError) {
    console.error(`Validation error creating data in ${modelName}:`, error);
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(`Known request error in ${modelName}:`, error);
  } else {
    console.error(`Error creating data in ${modelName}:`, error);
  }
}

// Main function to manage the seeding process
async function main() {
  const dataDirectory = path.join(__dirname, "seedData");
  
  const orderedFileNames: string[] = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData(orderedFileNames); // Assuming `deleteAllData` is implemented

  for (const fileName of orderedFileNames) {
    const modelName = path.basename(fileName, path.extname(fileName)) as ModelName;
    await seedData(fileName, modelName);
  }
}

// Entry point for the application
main()
  .catch((error) => {
    console.error('An error occurred in main:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
