import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expenseController";

const router = Router();

router.get("/expense", getExpensesByCategory);

export default router;