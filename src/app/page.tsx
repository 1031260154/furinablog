import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import PostCoverImage from '@/components/PostCoverImage'
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

const primaryButtonClass =
  'inline-flex items-center rounded-full border-2 border-slate-900 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800'
const secondaryButtonClass =
  'inline-flex items-center rounded-full border-2 border-slate-400 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-950'

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
  const basePath = getBasePath()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <section className="rounded-3xl border-2 border-slate-200 bg-white px-8 py-10 shadow-sm">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
            Personal Blog
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            记录学习、项目和长期有效的思考
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            这是我的个人博客，用来沉淀值得长期保留的内容。现在文章已经切到 Markdown，
            维护会更清晰，页面也统一成更简洁的卡片式布局。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className={secondaryButtonClass}>
              关于本站
            </Link>
            {posts[0] ? (
              <Link href={`/posts/${posts[0].slug}`} className={primaryButtonClass}>
                阅读最新文章
              </Link>
            ) : null}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">最新文章</h2>
            <span className="text-sm text-slate-500">共 {posts.length} 篇</span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-3xl border-2 border-slate-200 bg-white px-6 py-10 text-center text-slate-500 shadow-sm">
              还没有文章，新增 Markdown 后这里会自动显示。
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className="rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="space-y-5">
                    {getCoverImageSrc(basePath, post.coverImage) ? (
                      <PostCoverImage
                        src={getCoverImageSrc(basePath, post.coverImage)!}
                        alt={post.title}
                        priority={index === 0}
                      />
                    ) : null}

                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span>{formatDate(post.createdAt)}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{post.readingTime} 分钟阅读</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{post.author}</span>
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                      {post.title}
                    </h3>

                    <p className="text-sm leading-7 text-slate-600">{post.summary}</p>

                    {post.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
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
                      className="inline-flex items-center rounded-full border-2 border-slate-400 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-950"
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