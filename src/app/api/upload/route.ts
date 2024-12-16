import { envConfig } from '@/config/envConfig'
import * as fs from 'fs'

export async function POST(req: Request) {
  const { products } = await req.json()
  const authHeader = req.headers.get('Authorization')
  const [type, token] = authHeader ? authHeader.split(' ') : [undefined, undefined]

  if (type !== 'Bearer' || !token || token !== envConfig.token) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  console.log(products)

  const path = `${process.cwd()}/public/data/data.json`

  if (products) {
    fs.writeFileSync(path, JSON.stringify(products, null, 2))
  }

  return Response.json({ message: 'Thành công' }, { status: 200 })
}
