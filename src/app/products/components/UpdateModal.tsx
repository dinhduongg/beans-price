'use client'

import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { envConfig } from '@/config/envConfig'
import { Product } from '@/type/global.type'
import { cn } from '@/utilities/classNames'
import { isExistProduct } from '@/utilities/isExistProduct'

type UpdateModalProps = {
  isOpen: boolean
  product: Product | null
  products: Product[]
  closeModal: () => void
}

interface ErrorObject {
  [key: string]: string // Lỗi gắn với từng input theo tên
}

export default function UpdateModal(props: UpdateModalProps) {
  const { isOpen, product, products, closeModal } = props

  const [loading, setLoading] = useState(false)
  const [isChangeName, setIsChangeName] = useState(false)
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
    setIsChangeName(false)
  }

  // Tạo refs cho các input
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setState((prev) => ({ ...prev, [name]: value }))
    if (name === 'name') setIsChangeName(true)
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

    if (isChangeName && isExistProduct(products, state.name)) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!product || handleErrors()) {
      return
    }

    const clone = [...products]

    clone.map((item) => {
      if (item.id === product.id) {
        item.name = state.name
        item.price = parseInt(state.price)
        item.unit = state.unit.toLowerCase()
      }

      return item
    })

    try {
      setLoading(true)

      const res = await fetch(`${envConfig.url}/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${envConfig.token}`,
        },
        body: JSON.stringify({ products: clone }),
      })

      const dataRes = await res.json()

      if (res.status !== 200) {
        toast.error(dataRes.message)
      }

      toast.success(dataRes.message)
      closeModal()
      reset()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (product) {
      setState({
        name: product.name,
        price: product.price.toString(),
        unit: product.unit,
      })
    }
  }, [product])

  return (
    <div>
      <div
        className={cn('fixed inset-0 bg-black bg-opacity-50 transition-opacity z-10', {
          'opacity-100': isOpen,
          'opacity-0 pointer-events-none': !isOpen,
        })}
        onClick={closeModal}
      ></div>
      <div
        className={cn('fixed top-0 right-4 w-[calc(100%-32px)] rounded bg-white shadow-lg transform transition-transform duration-200 z-20', {
          'translate-y-4': isOpen,
          '-translate-y-[calc(100%+8px)]': !isOpen,
        })}
      >
        <div className="p-1 border-b flex items-end justify-between">
          <h2 className="text-lg font-bold">Sửa sản phẩm</h2>
          <div className="text-red-500 text-sm" onClick={closeModal}>
            Đóng
          </div>
        </div>
        <div className="p-1">
          <form onSubmit={handleSubmit} className="mt-2 space-y-3">
            <div>
              <label>Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                value={state?.name || ''}
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
                value={state?.price}
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
                value={state?.unit || ''}
                onChange={handleChange}
                className={cn('w-full outline-none border rounded px-2 py-1', {
                  'border-red-500': errors.unit && errors.unit.length > 0,
                })}
              />
              {errors.unit && <p className="text-red-500 text-xs">{errors.unit}</p>}
            </div>
            <button disabled={loading} type="submit" className="w-full bg-[#15ad1a] text-white rounded py-1 text-sm">
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
