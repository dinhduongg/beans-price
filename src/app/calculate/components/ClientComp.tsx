'use client'

import { useState } from 'react'

import { Product } from '@/type/global.type'
import { cleanText } from '@/utilities/cleanText'
import ProductItem from './ProductItem'
import { numberUnit } from '@/utilities/number'
import { caculatePerItem } from '@/utilities/money'

type ClientCompProps = {
  products: Product[]
}

interface ProductCart extends Product {
  quantity: string
  type: 'g' | 'kg'
}

export default function ClientComp(porps: ClientCompProps) {
  const { products } = porps

  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState<ProductCart[]>([])

  const handleSelect = (product: Product) => {
    const clone = [...selected]

    if (clone.find((item) => item.id === product.id)) {
      setSearchValue('')
    } else {
      setSelected([...clone, { ...product, quantity: '1', type: 'g' }])
      setSearchValue('')
    }
  }

  const handleUpdateQuantity = (id: string, quantity: string) => {
    const clone = [...selected]

    const index = clone.findIndex((item) => item.id === id)

    clone[index].quantity = quantity

    setSelected(clone)
  }

  const handleUpdateType = (id: string, type: 'g' | 'kg') => {
    const clone = [...selected]

    const index = clone.findIndex((item) => item.id === id)

    clone[index].type = type

    setSelected(clone)
  }

  const totalMoney = () => {
    const total = selected.reduce((acc, item) => {
      return acc + caculatePerItem(item)
    }, 0)

    return total
  }

  return (
    <div>
      <div className="px-1 py-2 sticky top-[44px] bg-white">
        <div className="relative">
          <input type="text" className="w-full p-1 outline-none rounded border" placeholder="Tìm sản phẩm" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          {searchValue.length > 0 && (
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center text-xl" onClick={() => setSearchValue('')}>
              <i className="bx bx-x"></i>
            </div>
          )}
          {searchValue.length > 0 && (
            <div className="absolute top-[calc(100%+4px)] left-0 right-0 max-h-64 border overflow-auto bg-white z-10">
              {products
                .filter((item) => cleanText(item.name.toLowerCase()).includes(cleanText(searchValue.toLowerCase())))
                .map((product, index) => (
                  <div key={index} className="border-b last:border-b-0 p-1 flex items-center justify-between" onClick={() => handleSelect(product)}>
                    <span>{product.name}</span>
                    <span className="text-red-500">
                      {numberUnit(product.price)} đ/{product.unit}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="px-1">
        {selected.map((product) => (
          <ProductItem key={product.id} product={product} handleUpdateQuantity={handleUpdateQuantity} handleUpdateType={handleUpdateType} />
        ))}
        <div className="mt-4">
          <div>
            Tổng tiền: <span className="text-red-500 ml-4 font-bold">{numberUnit(totalMoney())}đ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
