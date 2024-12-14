import { Metadata } from 'next'

import { parseData } from '@/utilities/parseData'
import data from '~/public/data/data.json'
import ClientComp from './components/ClientComp'

export const metadata: Metadata = {
  title: 'Thêm sản phẩm',
  description: 'Trang thêm sản phẩm',
}

export default function CreateProduct() {
  const parsed = parseData(data)

  return <ClientComp products={parsed} />
}
