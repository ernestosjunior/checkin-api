import { Express, json } from "express"
import cors from "cors"
import routes from "../app/routes"

type Port = number | string

export default function server(app: Express): void {
  const port: Port = process.env.PORT || 3000

  app.use(cors())
  app.use(json())
  app.use(routes)
  app.listen(port, () => console.log(`🚀 Server is running on PORT ${port}`))
}
