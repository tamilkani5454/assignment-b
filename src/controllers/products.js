import { pool } from "../config/dbconfig.js";

export const createProducts = async (req, res) => {

    const { name, category, price, stock } = req.body.newProduct
    try {
        if (!name || !category || !price || !stock) {
            return res.json({ success: true, message: "allfields required" })
        }
        const query = `INSERT INTO products (name, category, price, stock) VALUES($1,$2,$3,$4)`
        const result = await pool.query(query, [name, category, price, stock])
        res.json({ success: true, message: "products added successfully" })
    } catch (error) {
        res.json({ message: "internal server error" })
    }

}

export const updateProducts = async (req, res) => {

    const { name, category, price, stock,id } = req.body
    console.log(name, category, price, stock,id)
    try {
        if (!name || !category || !price || !stock) {
            return res.json({ success: true, message: "allfields required" })
        }
        const query = `UPDATE products SET name=$1, category=$2, price=$3, stock=$4  WHERE id=$5`
        const result = await pool.query(query, [name, category, price, stock, id])
        res.json({ success: true, message: "updated successfully" })
        return
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }


}

export const deleteProducts = async (req, res) => {
    const { id } = req.body;
    try {
        const query = `DELETE FROM products WHERE id =$1`
        await pool.query(query, [id])
        res.json({ success: true, message: "deleted successfully" })
        return
    } catch (error) {
        res.staus(500).json({ success: false, message: "internal server error" })
        return
    }
}
export const getProducts = async (req, res) => {
    try {
        const data = await pool.query(`SELECT * FROM products `)
        res.json(data.rows)
    } catch (error) {
        res.staus(500).json({ success: false, message: "internal server error" })
        return
    }
}