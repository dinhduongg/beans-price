'use client'

import { useRouter } from 'next/navigation'
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

  const router = useRouter()

  const updateProduct = (product: Product) => {
    setProduct(product)
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
    setProduct(null)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Xóa sản phẩm này?')) {
      const clone = [...products]

      const newProducts = clone.filter((item) => item.id !== id)

      console.log(newProducts)

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
      router.refresh()
    }
  }

  return (
    <div>
      <div className="px-1 py-2 sticky top-[44px] bg-white border-b">
        <div className="relative">
          <input type="text" className="w-full p-1 outline-none rounded border" placeholder="Tìm sản phẩm" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          {searchValue.length > 0 && (
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center text-xl" onClick={() => setSearchValue('')}>
              <i className="bx bx-x"></i>
            </div>
          )}
        </div>
      </div>
      {products
        .filter((item) => cleanText(item.name.toLowerCase()).includes(cleanText(searchValue.toLowerCase())))
        .map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} updateProduct={updateProduct} handleDelete={handleDelete} />
        ))}
      <UpdateModal isOpen={openModal} product={product} products={products} closeModal={closeModal} />
    </div>
  )
}
