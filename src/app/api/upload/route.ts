import { envConfig } from '@/config/envConfig'
import * as fs from 'fs'

export async function POST(req: Request) {
  const { products } = await req.json()
  const authHeader = req.headers.get('Authorization')
  const [type, token] = authHeader ? authHeader.split(' ') : [undefined, undefined]

  if (type !== 'Bearer' || !token || token !== envConfig.token) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const fileName = 'data.json'

  const path = `${process.cwd()}/public/data/${fileName}`

  if (products) {
    // Ensure the directory exists
    const dir = `${process.cwd()}/public/data/`
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // Write data to file, creating or overwriting it
    fs.writeFileSync(path, JSON.stringify(products, null, 2))
  }

  return Response.json({ message: 'Thành công' }, { status: 200 })
}
