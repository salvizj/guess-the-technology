import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"
import server from "./server.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
