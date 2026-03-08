import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: '关于',
  description: '了解这个博客的定位、技术栈和后续方向。',
  alternates: {
    canonical: '/about/',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
            About
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950">
            关于这个博客
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            这是一个基于 Next.js 构建的个人博客，部署在 GitHub Pages 上。
            它的目标很简单：用尽量清晰的结构记录值得长期保留的内容。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              返回首页
            </Link>

            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
            >
              查看文章
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">内容结构</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              页面代码放在 <code>src</code>，图片放在 <code>public/images</code>，
              文章放在 <code>content/posts</code>。
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">维护方式</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              现在新增文章只需要新建 Markdown 文件，不再需要去改 TypeScript 数据数组。
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">后续方向</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              后面可以继续增加标签、归档、搜索、评论和更完整的 SEO 能力。
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}