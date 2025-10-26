import express from "express"
import database from "./config/database.js"
import api from "./route/api.js"

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message : "ok"
    })
})

app.use('/api', api)

app.listen(3000, () => {
    database();
    console.log(`aplikasi berjalan di http://localhost:3000`);
})