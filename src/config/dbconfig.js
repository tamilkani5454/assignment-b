import pg from "pg"
const { Pool } = pg;
import dotenv from "dotenv"
dotenv.config()

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL ,
    ssl: { rejectUnauthorized: false }
});
export const data = async () => {
    try {
        const res = await pool.query("SELECT * FROM users");
        console.log(res.rows);
    } catch (error) {
        console.log(error)
    }

}