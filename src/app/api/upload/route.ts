import * as fs from 'fs'

export async function POST(req: Request) {
  const { products } = await req.json()

  const path = `${process.cwd()}/public/data/data.json`

  fs.writeFileSync(path, JSON.stringify(products, null, 2))

  return Response.json({ message: 'Thành công' })
}
