import path from "node:path"
import { fileURLToPath } from "node:url"
import express from "express"
import cookieParser from "cookie-parser"
import routes from "./routes/routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api", routes)

const clientBuildPath = path.resolve(__dirname, "../../client/build/client")
const uploadsPath = path.resolve(__dirname, "public/uploads")
app.use("/uploads", express.static(uploadsPath))
app.use(express.static(clientBuildPath))

app.get("{*splat}", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"))
})

export default app
