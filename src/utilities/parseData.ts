import { Product } from '@/type/global.type'

export const parseData = (data: unknown): Product[] => {
  return JSON.parse(JSON.stringify(data))
}
