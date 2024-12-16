'use client'

import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { envConfig } from '@/config/envConfig'
import { useOrigin } from '@/hooks/useOrigin'
import { Product } from '@/type/global.type'
import { cn } from '@/utilities/classNames'
import { isExistProduct } from '@/utilities/isExistProduct'

type ClientCompProps = {
  products: Product[]
}

interface ErrorObject {
  [key: string]: string // Lỗi gắn với từng input theo tên
}

export default function ClientComp(props: ClientCompProps) {
  const { products } = props

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    name: '',
    price: '',
    unit: '',
  })
  const [errors, setErrors] = useState<ErrorObject>({
    name: '',
    price: '',
    unit: '',
  })

  const origin = useOrigin()

  // Tạo refs cho các input
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

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
      const errorFields = Object.keys(errors)

      let begin = 0

      if (errorFields.length > 0) {
        let errorField = errorFields[begin]

        while (errors[errorField as keyof typeof errors] == '') {
          begin++
          errorField = errorFields[begin]
        }

        inputRefs.current[errorField]?.focus()
      }

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
      unit: state.unit.toLowerCase(),
    }

    try {
      setLoading(true)

      const res = await fetch(`${origin}/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${envConfig.token}`,
        },
        body: JSON.stringify({ products: [...clone, newProduct] }),
      })

      const dataRes = await res.json()

      if (res.status !== 200) {
        toast.error(dataRes.message)
      }

      toast.success(dataRes.message)
      reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-1 text-sm">
      <form onSubmit={handleSubmit} className="mt-2 space-y-4">
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            ref={(el) => {
              inputRefs.current['name'] = el
            }}
            value={state.name}
            onChange={handleChange}
            className={cn('w-full outline-none border rounded px-2 py-1', {
              'border-red-500': errors.name && errors.name.length > 0,
            })}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div>
          <label>Giá sản phẩm</label>
          <input
            type="number"
            name="price"
            ref={(el) => {
              inputRefs.current['price'] = el
            }}
            value={state.price}
            onChange={handleChange}
            className={cn('w-full outline-none border rounded px-2 py-1', {
              'border-red-500': errors.price && errors.price.length > 0,
            })}
          />
          {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
        </div>
        <div>
          <label>Đơn vị (kg, ràng, gói, ...)</label>
          <input
            type="text"
            name="unit"
            ref={(el) => {
              inputRefs.current['unit'] = el
            }}
            value={state.unit}
            onChange={handleChange}
            className={cn('w-full outline-none border rounded px-2 py-1', {
              'border-red-500': errors.unit && errors.unit.length > 0,
            })}
          />
          {errors.unit && <p className="text-red-500 text-xs">{errors.unit}</p>}
        </div>
        <button disabled={loading} type="submit" className="w-full bg-[#15ad1a] text-white rounded py-1">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  )
}
