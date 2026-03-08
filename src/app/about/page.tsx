import Link from 'next/link'
import Header from '@/components/Header'

const highlights = [
  {
    title: '轻量维护',
    description: '没有数据库和后端服务，适合个人长期写作、展示作品与积累知识。',
  },
  {
    title: '静态部署',
    description: '基于 Next.js 静态导出，推送到 GitHub 后即可通过 Actions 自动发布。',
  },
  {
    title: '内容沉淀',
    description: '博客聚焦学习记录、项目实践与值得反复回看的方法论内容。',
  },
]

const stack = ['Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub Pages']

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <section className="border-b border-slate-200/80 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_45%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-sm">
              About this site
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              一个为长期写作与内容沉淀而设计的个人博客
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              这里记录我的学习过程、项目实践与一些值得保存的想法。
              我希望它既足够轻量，能长期维护，也足够清晰，让每一篇内容都能被快速找到、持续积累。
            </p>
          </div>

          <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:grid-cols-2 lg:min-w-[320px] lg:grid-cols-1">
            <div>
              <p className="text-sm text-slate-500">内容方向</p>
              <p className="mt-1 text-base font-semibold text-slate-900">学习记录 / 项目实践 / 方法总结</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">站点目标</p>
              <p className="mt-1 text-base font-semibold text-slate-900">清晰、稳定、可长期维护</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 h-11 w-11 rounded-2xl bg-slate-900/95" />
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Why I built it
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              为什么选择这样的博客形态
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-8 text-slate-600 sm:text-base">
              <p>
                我想要的是一个不依赖复杂后台、部署流程足够稳定、同时又能持续扩展的写作空间。
                对个人博客来说，内容本身比系统复杂度更重要。
              </p>
              <p>
                因此这里采用了静态站点方案：写作成本低、运行成本低、发布路径清晰，
                也更适合慢慢打磨自己的内容体系和个人品牌表达。
              </p>
            </div>
          </article>

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-900 p-7 text-slate-50 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
              Tech stack
            </p>
            <h2 className="mt-4 text-2xl font-semibold">当前使用技术</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-100"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-300">
              当前版本优先保证“可用、可发布、可维护”，后续会逐步增强内容管理、SEO、检索和阅读体验。
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Continue reading
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                接下来你可以继续浏览首页文章，或者开始完善内容体系
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                当博客的结构、视觉与内容节奏逐渐稳定后，它会成为一个非常适合长期积累的个人站点。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
              >
                返回首页
              </Link>
              <Link
                href="/posts/welcome-to-my-static-blog"
                className="inline-flex items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900"
              >
                阅读示例文章
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
