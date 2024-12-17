import { existsSync, readFileSync } from 'fs'
import path from 'path'

export const getProducts = async () => {
  let data
  const filePath = path.resolve(process.cwd(), 'public/data/data.json')

  if (existsSync(filePath)) {
    const fileContent = readFileSync(filePath, 'utf-8')
    data = JSON.parse(fileContent)
  } else {
    data = []
  }

  return data
}
