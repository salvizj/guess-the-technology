import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from "vite"
import path from "node:path"

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(process.cwd(), "..")
  const env = loadEnv(mode, envDir, "")

  return {
    plugins: [tailwindcss(), reactRouter()],

    resolve: {
      tsconfigPaths: true,
    },

    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  }
})
