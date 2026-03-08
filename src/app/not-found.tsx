import Link from 'next/link'
import Header from '@/components/Header'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <div className="rounded-2xl bg-white p-10 shadow-sm">
          <p className="mb-3 text-sm font-medium text-gray-500">404</p>
          <h1 className="mb-4 text-3xl font-bold">页面不存在</h1>
          <p className="mb-8 text-gray-600">
            你访问的页面可能已经被删除，或者链接写错了。
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-lg bg-black px-5 py-3 text-white"
            >
              返回首页
            </Link>

            <Link
              href="/about"
              className="rounded-lg border px-5 py-3 text-gray-700"
            >
              关于本站
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}