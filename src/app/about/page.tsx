import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: '关于',
  description: '了解这个博客的定位、技术栈和后续迭代方向。',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    url: '/about/',
    title: '关于 | Furinablog',
    description: '了解这个博客的定位、技术栈和后续迭代方向。',
    images: ['/images/cover-1.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于 | Furinablog',
    description: '了解这个博客的定位、技术栈和后续迭代方向。',
    images: ['/images/cover-1.png'],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.1),_transparent_24%),linear-gradient(to_bottom,_#f8fbff,_#f8fafc_45%,_#ffffff_100%)] text-slate-900">
      <Header />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-34px_rgba(15,23,42,0.25)]">
          <div className="px-6 py-10 md:px-10 md:py-12">
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              About this site
            </span>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              关于这个博客
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              这是一个使用 Next.js 构建，并通过 GitHub Pages 发布的静态博客。它的目标不是做复杂系统，而是沉淀内容、展示项目、记录长期有效的经验。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-950 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-slate-800 hover:bg-slate-800"
              >
                返回首页
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950"
              >
                查看文章
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">定位</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-950">长期可维护</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              页面代码、图片资源、文章内容分层清楚，适合长期更新，不容易因为内容增加而失控。
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">技术栈</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-950">Next.js + Markdown</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              文章统一放到 <code>content/posts</code>，通过静态生成构建页面，适合 GitHub Pages。
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">后续方向</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-950">标签 / 归档 / 搜索 / SEO</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              现在已经有基础 metadata、sitemap、robots，后面可以继续扩展标签页、归档页和评论系统。
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}