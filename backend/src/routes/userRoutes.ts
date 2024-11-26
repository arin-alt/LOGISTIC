import { Router } from "express";
import { getUsers } from "../controllers/userController";

const router = Router();

// Handle `/users` endpoint
router.get("/users", getUsers);

export default router;
