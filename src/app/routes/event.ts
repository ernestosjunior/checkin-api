import { Router } from "express"
import { newEvent, getMembersOfEvent } from "../controllers"

const eventRoutes = Router()

eventRoutes.post("/", newEvent)
eventRoutes.get("/list", getMembersOfEvent)

export default eventRoutes
