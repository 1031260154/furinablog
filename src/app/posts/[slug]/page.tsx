import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { getAllPostSlugs, getAllPostsMeta, getPostBySlug } from '@/lib/posts'

type PageProps = {
  params: Promise<{ slug: string }>
}

const siteUrl = 'https://1031260154.github.io'
const repoBase = '/furinablog'

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

function buildCoverImageUrl(coverImage?: string) {
  const safeCover = coverImage?.replace(/^\/+/, '') || 'images/cover-1.png'
  return `${siteUrl}${repoBase}/${safeCover.startsWith('images/') ? safeCover : `images/${safeCover}`}`
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: '文章不存在',
    }
  }

  const postUrl = `${siteUrl}${repoBase}/posts/${post.slug}/`
  const imageUrl = buildCoverImageUrl(post.coverImage)

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.summary,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [imageUrl],
    },
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPostsMeta()])

  if (!post) {
    notFound()
  }

  const basePath = getBasePath()
  const currentIndex = allPosts.findIndex((item) => item.slug === post.slug)
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const olderPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.1),_transparent_24%),linear-gradient(to_bottom,_#f8fbff,_#f8fafc_45%,_#ffffff_100%)] text-slate-900">
      <Header />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="transition hover:text-slate-900">
            首页
          </Link>
          <span>/</span>
          <span className="line-clamp-1 text-slate-700">{post.title}</span>
        </div>

        <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-34px_rgba(15,23,42,0.25)]">
          {getCoverImageSrc(basePath, post.coverImage) ? (
            <div className="relative aspect-[16/8] overflow-hidden bg-slate-100">
              <Image
                src={getCoverImageSrc(basePath, post.coverImage)!}
                alt={post.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
            </div>
          ) : null}

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-medium text-sky-700">
                文章详情
              </span>
              <span>{formatDate(post.createdAt)}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{post.readingTime} 分钟阅读</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{post.author}</span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{post.summary}</p>

            {post.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </article>

        <section className="mt-8 rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-[0_18px_60px_-34px_rgba(15,23,42,0.22)] md:px-10 md:py-10">
          <MarkdownRenderer content={post.content} />
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">继续阅读</p>
            {olderPost ? (
              <>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">上一篇</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{olderPost.title}</p>
                <Link
                  href={`/posts/${olderPost.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-sky-700 transition hover:text-sky-900"
                >
                  打开上一篇 →
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm leading-7 text-slate-600">
                这已经是目前最早的一篇文章了。
              </p>
            )}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">继续阅读</p>
            {newerPost ? (
              <>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">下一篇</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{newerPost.title}</p>
                <Link
                  href={`/posts/${newerPost.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-sky-700 transition hover:text-sky-900"
                >
                  打开下一篇 →
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm leading-7 text-slate-600">
                这已经是目前最新的一篇文章了。
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}