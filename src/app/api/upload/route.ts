import { envConfig } from '@/config/envConfig'
import * as fs from 'fs'

export async function POST(req: Request) {
  const { products } = await req.json()
  const authHeader = req.headers.get('Authorization')
  const [type, token] = authHeader ? authHeader.split(' ') : [undefined, undefined]

  if (type !== 'Bearer' || !token || token !== envConfig.token) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (products) {
    const dirPath = `${process.cwd()}/public/data`
    const filePath = `${dirPath}/data.json`

    // Ensure the directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
      const defaultData = [] as unknown
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2))
    }

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2))
  }

  return Response.json({ message: 'Thành công' }, { status: 200 })
}
