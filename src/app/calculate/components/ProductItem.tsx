'use client'

import { useEffect, useState } from 'react'

import { Product } from '@/type/global.type'
import { caculatePerItem } from '@/utilities/money'
import { numberUnit } from '@/utilities/number'

interface ProductCart extends Product {
  quantity: string
  type: 'g' | 'kg'
}

type ProductItemProps = {
  product: ProductCart
  handleUpdateType: (id: string, type: 'g' | 'kg') => void
  handleUpdateQuantity: (id: string, quantity: string) => void
}

export default function ProductItem({ product, handleUpdateType, handleUpdateQuantity }: ProductItemProps) {
  const [quantity, setQuantity] = useState(product.quantity)
  const [option, setOption] = useState(product.type)

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setQuantity(value)
    handleUpdateQuantity(product.id, value)
  }

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    setOption(value as 'g' | 'kg')
    handleUpdateType(product.id, value as 'g' | 'kg')
  }

  useEffect(() => {
    setQuantity(product.quantity)
  }, [product])

  return (
    <div className="border-b last:border-b-0 p-2 flex justify-between">
      <span>{product.name}</span>
      <div className="flex items-center gap-2">
        <input type="number" min={1} value={quantity} onChange={handleChangeQuantity} className="border outline-none w-12 text-xs text-center py-1" />
        {product.unit === 'kg' && (
          <select value={option} onChange={handleChangeType} className="border outline-none text-xs text-center py-1">
            <option value="g">lạng</option>
            <option value="kg">kg</option>
          </select>
        )}
        <div className="text-red-500 w-20 text-right">{numberUnit(caculatePerItem(product))}đ</div>
      </div>
    </div>
  )
}
