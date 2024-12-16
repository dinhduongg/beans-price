import { Product } from '@/type/global.type'

interface ProductCart extends Product {
  quantity: string
  type: string
}

export const caculatePerItem = (product: ProductCart): number => {
  // lang: lạng
  if (product.unit === 'kg') {
    const pricePerLang = product.price / 10

    if (product.type === 'kg') {
      return product.price * Number(product.quantity)
    } else {
      return pricePerLang * Number(product.quantity)
    }
  } else {
    return product.price * Number(product.quantity)
  }
}
