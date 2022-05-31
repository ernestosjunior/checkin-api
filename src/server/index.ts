import app from "../app"
import configApp from "../config"

type Port = number | string

export default function server(): void {
  configApp(app)

  const port: Port = process.env.PORT || 3000

  app.listen(port, () => console.log(`Server is running on PORT ${port}`))
}
