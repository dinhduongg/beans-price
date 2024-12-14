'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import { envConfig } from '@/config/envConfig'
import { Product } from '@/type/global.type'
import { cleanText } from '@/utilities/cleanText'
import ProductItem from './ProductItem'
import UpdateModal from './UpdateModal'

type ClientCompProps = {
  products: Product[]
}

export default function ClientComp(props: ClientCompProps) {
  const { products } = props

  const [openModal, setOpenModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [product, setProduct] = useState<Product | null>(null)

  const updateProduct = (product: Product) => {
    setProduct(product)
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
    setProduct(null)
  }

  const handleDelete = async () => {
    if (!confirm('Xóa sản phẩm này?')) {
      const clone = [...products]

      const newProducts = clone.filter((item) => item.id !== product?.id)

      const res = await fetch(`${envConfig.url}/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${envConfig.token}`,
        },
        body: JSON.stringify({ products: newProducts }),
      })

      const dataRes = await res.json()

      if (res.status !== 200) {
        toast.error(dataRes.message)
      }

      toast.success(dataRes.message)
    }
  }

  return (
    <div>
      <div className="sticky top-0 bg-white">
        <h1 className="p-2 border-b text-center font-bold text-lg">Danh sách sản phẩm</h1>
        <div className="px-1">
          <input type="text" className="w-full p-1 outline-none rounded border" placeholder="Tìm sản phẩm" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
      </div>
      {products
        .filter((item) => cleanText(item.name).includes(cleanText(searchValue)))
        .map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} updateProduct={updateProduct} handleDelete={handleDelete} />
        ))}
      <UpdateModal isOpen={openModal} product={product} products={products} closeModal={closeModal} />
    </div>
  )
}
