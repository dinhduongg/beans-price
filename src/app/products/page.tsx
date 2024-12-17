import { Metadata } from 'next'

import Link from 'next/link'

import { getProducts } from '@/actions/get-products'
import { parseData } from '@/utilities/parseData'
import ClientComp from './components/ClientComp'

export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
  description: 'Trang danh sách sản phẩm',
}

export default async function Products() {
  const data = await getProducts()
  const parsed = parseData(data)

  return (
    <div>
      <div className="text-center py-2 shadow-md sticky top-0 bg-white z-10">
        <h2 className="text-lg font-bold">Danh sách sản phẩm</h2>
        <Link href="/" className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center text-3xl">
          <i className="bx bx-chevron-left"></i>
        </Link>
      </div>
      <ClientComp products={parsed} />
    </div>
  )
}
