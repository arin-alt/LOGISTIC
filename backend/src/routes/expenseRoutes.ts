import { Router } from "express";
import { getExpensesByCategory, getExpenses } from "../controllers/expenseController";

const router = Router();

// Route to fetch all expenses by category
router.get("/expenseByCategory", getExpensesByCategory);

// Route to fetch all expense summaries
router.get("/expenseSummary", getExpenses);

export default router;
