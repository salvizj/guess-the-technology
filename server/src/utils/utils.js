import fs from "node:fs/promises"
import path from "node:path"
import crypto from "node:crypto"

export const saveImage = async (dataUrl) => {
  if (!dataUrl?.startsWith("data:image/")) return null

  const [header, base64Data] = dataUrl.split(";base64,")
  const extension = header.split("/")[1].replace("+xml", "")
  const filename = `${crypto.randomUUID()}.${extension}`

  await fs.writeFile(
    path.join(uploadDir, filename),
    Buffer.from(base64Data, "base64"),
  )
  return `/uploads/${filename}`
}
