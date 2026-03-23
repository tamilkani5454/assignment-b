import { verifyAdmin } from "../auth/auth.js";
import { createProducts, deleteProducts, getProducts, updateProducts } from "../controllers/products.js";
import express from "express";
export const productsRoutes = express.Router()

productsRoutes.get("/get-products", verifyAdmin, getProducts)
productsRoutes.post("/create-products", verifyAdmin, createProducts)
productsRoutes.post("/update-products", verifyAdmin, updateProducts)
productsRoutes.post("/delete-products", verifyAdmin, deleteProducts)