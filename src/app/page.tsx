import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        <Link href="/create-product" className="p-2 border border-[#15ad1a] w-full text-center rounded text-sm flex items-center justify-center bg-[#15ad1a] text-white">
          Thêm sản phẩm
        </Link>
        <Link href="/calculate" className="p-2 border border-[#3498db] w-full text-center rounded text-sm flex items-center justify-center bg-[#3498db] text-white">
          Tính tiền
        </Link>
      </div>
    </div>
  )
}
