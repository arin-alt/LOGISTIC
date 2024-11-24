"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.get("/product", productController_1.getProducts);
router.post("/product", productController_1.createProduct);
exports.default = router;
