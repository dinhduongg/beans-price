import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-2">
        <Link href="/create-product" className="p-2 w-full text-center rounded text-sm flex items-center justify-center bg-[#15ad1a] text-white">
          Thêm sản phẩm
        </Link>
        <Link href="/products" className="p-2 w-full text-center rounded text-sm flex items-center justify-center bg-[#3498db] text-white">
          Danh sách sản phẩm
        </Link>
        <Link href="/calculate" className="col-span-2 p-2 w-full text-center rounded text-sm flex items-center justify-center bg-red-500 text-white">
          Tính tiền
        </Link>
      </div>
    </div>
  )
}
