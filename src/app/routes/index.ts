import { Router } from "express"
import eventRoutes from "./event"
import memberRoutes from "./member"

const routes = Router()

routes.get("/", (_req, res) =>
  res.status(200).json({ success: true, info: "checkin-api" })
)

routes.use("/event", eventRoutes)
routes.use("/checkin", memberRoutes)

export default routes
