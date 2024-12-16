'use client'

import { Product } from '@/type/global.type'
import { numberUnit } from '@/utilities/number'

type ProductItemProps = {
  index: number
  product: Product
  handleDelete: (id: string) => Promise<void>
  updateProduct: (product: Product) => void
}

export default function ProductItem(props: ProductItemProps) {
  const { product, index, handleDelete, updateProduct } = props

  return (
    <div key={product.id} className="p-2 border-b flex items-center justify-between">
      <span>
        {index + 1}. {product.name}
      </span>
      <div className="flex items-end gap-4">
        <span>{numberUnit(product.price)}</span>
        <span className="w-8 text-right text-green-500">{product.unit}</span>
        <div className="text-xs" onClick={() => updateProduct(product)}>
          Sửa
        </div>
        <div className="text-xs text-red-500" onClick={() => handleDelete(product.id)}>
          Xóa
        </div>
      </div>
    </div>
  )
}
