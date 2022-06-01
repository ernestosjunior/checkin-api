import { Router } from "express"
import { checkin } from "../controllers"

const memberRoutes = Router()

memberRoutes.post("/", checkin)

export default memberRoutes
