import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { getAllPostsMeta } from '@/lib/posts'

export const metadata: Metadata = {
  title: '首页',
  description: '记录学习、项目实践和长期积累。',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: 'Furinablog',
    description: '记录学习、项目实践和长期积累。',
    images: ['/images/cover-1.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Furinablog',
    description: '记录学习、项目实践和长期积累。',
    images: ['/images/cover-1.png'],
  },
}

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
  if (!coverImage) return null

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
              Personal Blog
            </span>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              记录学习、项目和长期有效的思考
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              这个博客用来沉淀值得反复回看的内容。现在文章已经迁移到 Markdown，
              后续维护会更清晰，也更适合长期更新。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={featuredPost ? `/posts/${featuredPost.slug}` : '/about'}
                className="inline-flex items-center rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {featuredPost ? '阅读最新文章' : '查看关于页面'}
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
              >
                关于本站
              </Link>
            </div>
          </div>
        </section>

        {featuredPost ? (
          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                精选文章
              </h2>
              <span className="text-sm text-slate-500">最新发布</span>
            </div>

            <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[260px] bg-slate-100">
                  {getCoverImageSrc(basePath, featuredPost.coverImage) ? (
                    <Image
                      src={getCoverImageSrc(basePath, featuredPost.coverImage)!}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span>{formatDate(featuredPost.createdAt)}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{featuredPost.readingTime} 分钟阅读</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{featuredPost.author}</span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                    {featuredPost.title}
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {featuredPost.summary}
                  </p>

                  {featuredPost.tags.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag) => (
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
                    href={`/posts/${featuredPost.slug}`}
                    className="mt-6 inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                  >
                    阅读全文
                  </Link>
                </div>
              </div>
            </article>
          </section>
        ) : null}

        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              最新文章
            </h2>
            <span className="text-sm text-slate-500">共 {posts.length} 篇</span>
          </div>

          {otherPosts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-500 shadow-sm">
              目前只有一篇文章，继续更新后会显示更多内容。
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {otherPosts.map((post) => (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[16/9] bg-slate-100">
                    {getCoverImageSrc(basePath, post.coverImage) ? (
                      <Image
                        src={getCoverImageSrc(basePath, post.coverImage)!}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
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

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {post.summary}
                    </p>

                    <Link
                      href={`/posts/${post.slug}`}
                      className="mt-5 inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
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