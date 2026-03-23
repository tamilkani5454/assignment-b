import express from "express"
import { checkAdmin, verifyAdmin } from "../auth/auth.js";

export const authRoutes = express.Router()
authRoutes.get("/admin-check", verifyAdmin,checkAdmin)