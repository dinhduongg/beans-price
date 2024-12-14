import { Product } from '@/type/global.type'

export const parseData = (data: unknown): Product[] => {
  const parsed = JSON.parse(JSON.stringify(data))
  const sorted = parsed.sort((a: Product, b: Product) => a.unit.localeCompare(b.unit))
  return sorted
}
