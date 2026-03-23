import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import { authRoutes } from "./src/routes/authRoutes.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import { productsRoutes } from "./src/routes/productsroutes.js";
dotenv.config()
const port = 1000
const app = express()
app.use(cors())
app.use(express.json());


app.use("/register", userRoutes)
app.use("/auth", authRoutes)
app.use("/products/", productsRoutes)


//app.listen(port)
export default app


