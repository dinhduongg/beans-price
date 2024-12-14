import { Product } from '@/type/global.type'

export const isExistProduct = (products: Product[], name: string): boolean => {
  return products.some((product) => product.name.toLowerCase() === name.toLowerCase())
}
