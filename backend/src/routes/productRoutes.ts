import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";

const router = Router();

// Ensure routes are properly defined for product endpoints
router.get("/products", getProducts);
router.post("/products", createProduct);

export default router;
