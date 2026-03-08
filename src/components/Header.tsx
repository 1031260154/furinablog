import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Furinablog
        </Link>

        <nav className="flex gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">
            首页
          </Link>
          <Link href="/about" className="hover:text-black">
            关于
          </Link>
        </nav>
      </div>
    </header>
  )
}