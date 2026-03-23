import { pool } from "../config/dbconfig.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const createUser = async () => {
    try {

        const name = "kani"
        const email = "demo@gmail.com"
        const password = "Admin@123"
        const hashedPassword = await bcrypt.hash(password, 10)
        const query = `INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`
        await pool.query(query, [name, email, hashedPassword])
        console.log("user created")
    } catch (error) {
        console.log(error)
    }

}
export const login = async (req, res) => {
    
    const { email, password } = req.body;
    try {
        const query = `SELECT * FROM users WHERE email=$1`
        const result = await pool.query(query, [email])
        const user = result.rows[0]
        if (!user) {
            console.log("user not found")
            res.json({ message: "user not found" })
            return
        }

        const veriyfyUser = await bcrypt.compare(password, user.password)
        if (!veriyfyUser) {
            console.log("incorrect password")
            res.json({ message: "incorrect password" })
            return
        }
        const token = await jwt.sign({ user_id: user.id }, process.env.SECRET_CODE, { expiresIn: "7d" })
        res.json({ success: true, message: "login success", user, token })
    } catch (error) {
        console.log(error)
    }

}