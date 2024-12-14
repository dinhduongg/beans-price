import { parseData } from '@/utilities/parseData'
import data from '~/public/data/data.json'
import ClientComp from './components/ClientComp'

export default function CreateProduct() {
  const parsed = parseData(data)

  return <ClientComp products={parsed} />
}
