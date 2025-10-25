import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.status(200).json({
        message : "ok"
    })
})

app.listen(3000, () => {
    console.log(`aplikasi berjalan di http://localhost:3000`)
})