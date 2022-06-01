import { Router } from "express"
import eventRoutes from "./event"
import memberRoutes from "./member"

const routes = Router()

routes.use("/event", eventRoutes)
routes.use("/checkin", memberRoutes)

export default routes
