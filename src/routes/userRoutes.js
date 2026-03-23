import express from "express"
import { login } from "../controllers/user.js"

export const userRoutes = express.Router()

userRoutes.post("/login",login)