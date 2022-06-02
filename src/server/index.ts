import { Express, json } from "express"
import cors from "cors"
import routes from "../app/routes"

type Port = number | string

export default function server(app: Express): void {
  const port: Port = process.env.PORT || 3000

  const options = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }

  app.use(cors(options))
  app.use(json())
  app.use(routes)
  app.listen(port, () => console.log(`🚀 Server is running on PORT ${port}`))
}
