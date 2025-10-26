import express from "express"
import * as movieController from "../controller/movieController.js"

const api = express.Router()

api.get("/movie", movieController.listMessage)
api.post("/movie", movieController.createMessage)
api.put("/movie/:id", movieController.updateMessage)
api.delete("/movie/:id", movieController.deleteMessage)

export default api
