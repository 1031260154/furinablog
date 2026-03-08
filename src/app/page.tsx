import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { getAllPostsMeta } from '@/lib/posts'

function getBasePath() {
  return process.env.NODE_ENV === 'production' ? '/furinablog' : ''
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getCoverImageSrc(basePath: string, coverImage?: string) {
  if (!coverImage) {
    return null
  }

  const safeCover = coverImage.replace(/^\/+/, '')
  return safeCover.startsWith('images/')
    ? `${basePath}/${safeCover}`
    : `${basePath}/images/${safeCover}`
}

export default async function HomePage() {
  const posts = await getAllPostsMeta()
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)
  const basePath = getBasePath()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_28%),linear-gradient(to_bottom,_#f8fbff,_#eef4ff_35%,_#f8fafc_100%)] text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 px-6 py-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur xl:px-10 xl:py-10">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.16),_transparent_55%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                个人博客 / 静态站点 / Markdown 内容管理
              </span>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                把文章、项目和思考，
                <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                  {' '}
                  沉淀成长期资产
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                这里记录我的学习路径、项目实践和值得反复回看的经验。现在首页和文章详情已经统一为同一套轻盈、卡片化、可长期维护的视觉语言。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={featuredPost ? `/posts/${featuredPost.slug}` : '/about'}
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {featuredPost ? '阅读最新文章' : '查看关于页面'}
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
                >
                  关于本站
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-sm sm:col-span-2">
                <p className="text-sm font-medium text-slate-500">站点概览</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-3xl font-semibold text-slate-950">{posts.length}</p>
                    <p className="mt-1 text-sm text-slate-500">已发布文章</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-slate-950">MD</p>
                    <p className="mt-1 text-sm text-slate-500">内容维护方式</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-slate-950">Pages</p>
                    <p className="mt-1 text-sm text-slate-500">自动部署目标</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200/80 bg-slate-950 p-5 text-slate-50 shadow-sm">
                <p className="text-sm font-medium text-slate-300">维护体验</p>
                <p className="mt-3 text-lg font-semibold">文章与代码分离</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  文章统一存放到{' '}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-slate-100">
                    content/posts
                  </code>
                  ，后续维护更清晰。
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-sky-500 to-indigo-500 p-5 text-white shadow-sm">
                <p className="text-sm font-medium text-sky-100">站点目标</p>
                <p className="mt-3 text-lg font-semibold">简洁、稳定、长期可迭代</p>
                <p className="mt-2 text-sm leading-7 text-sky-50/90">
                  优先保证结构清楚，后续再扩展标签、归档、搜索和 SEO。
                </p>
              </div>
            </div>
          </div>
        </section>

        {featuredPost ? (
          <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.28)]">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                {getCoverImageSrc(basePath, featuredPost.coverImage) ? (
                  <Image
                    src={getCoverImageSrc(basePath, featuredPost.coverImage)!}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover"
                  />
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent" />
                <div className="absolute left-6 top-6 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                  精选文章
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span>{formatDate(featuredPost.createdAt)}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{featuredPost.readingTime} 分钟阅读</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{featuredPost.author}</span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  {featuredPost.summary}
                </p>

                {featuredPost.tags.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <Link
                  href={`/posts/${featuredPost.slug}`}
                  className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  阅读全文
                </Link>
              </div>
            </article>

            <aside className="grid gap-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-500">现在这套首页会统一什么</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li>• 统一 Hero、文章卡片、按钮和信息层级。</li>
                  <li>• 首页与详情页共享同一套圆角、边框、阴影和留白节奏。</li>
                  <li>• 后续扩展归档、标签、搜索时不需要推翻重做。</li>
                </ul>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-500">当前维护方式</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">直接编辑 Markdown</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  文章不再写死在 TypeScript 数组里，后续新增内容只需要新建一篇{' '}
                  <code>*.md</code> 文件并提交到仓库。
                </p>
              </div>
            </aside>
          </section>
        ) : null}

        <section className="mt-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">
                Posts
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                最新文章
              </h2>
              <p className="mt-2 text-slate-600">
                首页列表也改成了更稳定的卡片布局，后续增加文章不会显得拥挤。
              </p>
            </div>
            <p className="text-sm text-slate-500">共 {posts.length} 篇文章</p>
          </div>

          {otherPosts.length === 0 ? (
            <div className="mt-6 rounded-[28px] border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center text-slate-500">
              目前只有一篇文章，继续更新就会自动显示在这里。
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {otherPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_48px_-28px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-34px_rgba(15,23,42,0.3)]"
                >
                  <div className="relative aspect-[16/9] bg-slate-100">
                    {getCoverImageSrc(basePath, post.coverImage) ? (
                      <Image
                        src={getCoverImageSrc(basePath, post.coverImage)!}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span>{formatDate(post.createdAt)}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{post.readingTime} 分钟阅读</span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">{post.summary}</p>

                    {post.tags.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <Link
                      href={`/posts/${post.slug}`}
                      className="mt-5 inline-flex items-center text-sm font-medium text-sky-700 transition group-hover:text-sky-900"
                    >
                      阅读全文 →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}