import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardController";

const router = Router();

// Ensure the route is properly defined for the `/dashboard` endpoint
router.get("/", getDashboardMetrics);

export default router;
