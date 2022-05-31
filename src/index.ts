import app from "./app"
import server from "./server"
import { config } from "dotenv"

config()
server(app)
