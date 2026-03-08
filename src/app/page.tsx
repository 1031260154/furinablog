import Link from 'next/link'
import Header from '@/components/Header'
import { posts } from '@/data/posts'

function getBasePath() {
  return process.env.NODE_ENV === 'production' ? '/furinablog' : ''
}

export default function HomePage() {
  const basePath = getBasePath()
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-black/5">
            <p className="mb-3 text-sm font-medium text-blue-600">
              个人博客 / 静态站点
            </p>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              欢迎来到我的
              <br />
              静态博客
            </h1>
            <p className="mb-8 max-w-xl leading-8 text-gray-600">
              这里记录我的学习、项目实践和一些值得保存的想法。
              博客基于 Next.js 构建，并通过 GitHub Pages 自动发布。
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={featuredPost ? `/posts/${featuredPost.slug}` : '/about'}
                className="rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90"
              >
                阅读最新文章
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-gray-300 px-5 py-3 text-gray-700 transition hover:bg-gray-50"
              >
                关于本站
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-600 p-8 text-white shadow-sm">
            <p className="mb-3 text-sm opacity-80">博客简介</p>
            <h2 className="mb-4 text-2xl font-bold">专注于清晰、轻量、可长期维护</h2>
            <ul className="space-y-3 text-sm leading-7 opacity-95">
              <li>• 无后端，维护成本低</li>
              <li>• 使用 Markdown 编写正文</li>
              <li>• GitHub Actions 自动部署</li>
              <li>• 适合做个人展示与内容沉淀</li>
            </ul>
          </div>
        </section>

        {featuredPost ? (
          <section className="mb-14">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">精选文章</h2>
              <Link href={`/posts/${featuredPost.slug}`} className="text-sm text-blue-600 hover:underline">
                查看详情
              </Link>
            </div>

            <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="grid md:grid-cols-2">
                <div className="h-full">
                  <img
                    src={`${basePath}/images/${featuredPost.coverImage}`}
                    alt={featuredPost.title}
                    className="h-full min-h-[280px] w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p className="mb-3 text-sm text-gray-500">
                    {new Date(featuredPost.createdAt).toLocaleDateString('zh-CN')}
                  </p>
                  <h3 className="mb-4 text-3xl font-bold">{featuredPost.title}</h3>
                  <p className="mb-6 leading-8 text-gray-600">
                    {featuredPost.summary}
                  </p>

                  <Link
                    href={`/posts/${featuredPost.slug}`}
                    className="inline-flex w-fit rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90"
                  >
                    阅读全文
                  </Link>
                </div>
              </div>
            </article>
          </section>
        ) : null}

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">更多文章</h2>
            <p className="text-sm text-gray-500">持续更新中</p>
          </div>

          {otherPosts.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-gray-500 shadow-sm ring-1 ring-black/5">
              暂无更多文章
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {otherPosts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={`${basePath}/images/${post.coverImage}`}
                    alt={post.title}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-6">
                    <p className="mb-2 text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                    </p>

                    <h3 className="mb-3 text-xl font-bold">{post.title}</h3>

                    <p className="mb-4 leading-7 text-gray-600">
                      {post.summary}
                    </p>

                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      阅读全文
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