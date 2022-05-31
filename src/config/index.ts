import { Express, json } from "express"
import cors from "cors"

export default function configApp(app: Express) {
  app.use(cors())
  app.use(json())
}
