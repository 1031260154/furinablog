import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-3xl font-bold">关于这个博客</h1>
          <p className="leading-8 text-gray-700">
            这是一个使用 Next.js 构建，并通过 GitHub Pages 发布的静态博客。
          </p>
        </div>
      </main>
    </div>
  )
}