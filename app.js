import express from "express"
import database from "./config/database.js"

const app = express()

app.get("/", (req, res) => {
    res.status(200).json({
        message : "ok"
    })
})

app.listen(3000, () => {
    database();
    console.log(`aplikasi berjalan di http://localhost:3000`);
})