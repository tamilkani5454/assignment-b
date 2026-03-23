import jwt from "jsonwebtoken";
import { pool } from "../config/dbconfig.js";

export const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ msg: "No token" });
        const token = authHeader.split(" ")[1];
        if (!token)
            return res
                .status(401)
                .json({ success: false, message: "Not authorized" });
        const decoded = jwt.verify(token, process.env.SECRET_CODE);
        const qery = `SELECT * FROM users WHERE id=$1`
        const adminExists = await pool.query(qery, [decoded.user_id])
        //console.log(adminExists.rows)
        if (adminExists.rows.length == 0) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        req.admin = adminExists.rows[0];
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
export const checkAdmin = async (req, res) => {
    
    res.json({
        success: true,
        admin: { id: req.admin.id },
        message: "Admin login success",
    });
};



git init


https://github.com/tamilkani5454/assignment-b.git