import { Metadata } from 'next'

import { parseData } from '@/utilities/parseData'
import data from '~/public/data/data.json'
import ClientComp from './components/ClientComp'

export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
  description: 'Trang danh sách sản phẩm',
}

export default function Products() {
  const parsed = parseData(data)

  return <ClientComp products={parsed} />
}
