'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import { Product } from '@/type/global.type'
import { isExistProduct } from '@/utilities/isExistProduct'

type ClientCompProps = {
  products: Product[]
}

export default function ClientComp(props: ClientCompProps) {
  const { products } = props

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    name: '',
    price: '',
    unit: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    unit: '',
  })

  const reset = () => {
    setState({
      name: '',
      price: '',
      unit: '',
    })
    setErrors({
      name: '',
      price: '',
      unit: '',
    })
  }

  const handleErrors = () => {
    const errors = {
      name: '',
      price: '',
      unit: '',
    }

    if (!state.name) {
      errors.name = 'Tên sản phẩm không được để trống'
    }

    if (!state.price) {
      errors.price = 'Giá sản phẩm không được để trống'
    }

    if (!state.unit) {
      errors.unit = 'Đơn vị sản phẩm không được để trống'
    }

    if (isExistProduct(products, state.name)) {
      errors.name = 'Tên sản phẩm đã tồn tại'
    }

    setErrors(errors)
    if (Object.keys(errors).some((key) => errors[key as keyof typeof errors])) {
      return true
    } else {
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (handleErrors()) {
      return
    }

    const clone = [...products]

    const newProduct = {
      id: String(Date.now()),
      name: state.name,
      price: Number(state.price),
      unit: state.unit,
    }

    try {
      setLoading(true)

      const res = await fetch(`http://localhost:3000/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: [...clone, newProduct] }),
      })

      const dataRes = await res.json()

      toast.success(dataRes.message)
      reset()
    } catch {
      toast.error('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-1 text-sm">
      <h2 className="text-lg font-bold">Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit} className="mt-2 space-y-4">
        <div>
          <label>Tên sản phẩm</label>
          <input type="text" name="name" value={state.name} onChange={handleChange} className="w-full outline-none border rounded px-2 py-1" />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div>
          <label>Giá sản phẩm</label>
          <input type="number" name="price" value={state.price} onChange={handleChange} className="w-full outline-none border rounded px-2 py-1" />
          {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
        </div>
        <div>
          <label>Đơn vị (kg, ràng, gói, ...)</label>
          <input type="text" name="unit" value={state.unit} onChange={handleChange} className="w-full outline-none border rounded px-2 py-1" />
          {errors.unit && <p className="text-red-500 text-xs">{errors.unit}</p>}
        </div>
        <button disabled={loading} type="submit" className="w-full bg-[#15ad1a] text-white rounded py-1">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  )
}
