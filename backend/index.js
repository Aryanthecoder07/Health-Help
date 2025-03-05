
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: "neondb_owner",
  host: "ep-mute-hall-a8tfzkbs-pooler.eastus2.azure.neon.tech",
  database: "neondb",
  password: "npg_3mXibo1ZOMnY",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
const SECRET_KEY = "SECRET_KEY";

// Authentication Route
app.post("/auth", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            if (user.rows[0].password !== password) {
                return res.status(401).json({ message: "Incorrect password!" });
            }
        } else {
            await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
        }
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ message: "Login successful!", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Exercise Tracking Route
app.post("/track", async (req, res) => {
    const { email, exer, kcal, time } = req.body;
    try {
        await pool.query(
            `INSERT INTO track (email, exer, kcal, time, date) 
             VALUES ($1, $2, $3, $4, CURRENT_DATE) 
             ON CONFLICT (email, date) 
             DO UPDATE SET exer = $2, kcal = $3, time = $4`,
            [email, exer, kcal, time]
        );
        return res.json({ message: "Exercise tracked successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Fetch Tracking Data
app.post("/get-track", async (req, res) => {
    const { email } = req.body;
    try {
        const result = await pool.query("SELECT * FROM track WHERE email = $1 ORDER BY date DESC", [email]);
        return res.json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
