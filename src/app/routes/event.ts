import { Router } from "express"
import { newEvent, getMembersOfEvent, validatePin } from "../controllers"

const eventRoutes = Router()

eventRoutes.post("/", newEvent)
eventRoutes.get("/list/:eventPin", getMembersOfEvent)
eventRoutes.post("/validate", validatePin)

export default eventRoutes
