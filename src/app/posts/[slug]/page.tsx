import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import PostCoverImage from '@/components/PostCoverImage'
import { getAllPostSlugs, getAllPostsMeta, getPostBySlug } from '@/lib/posts'

type PageProps = {
  params: Promise<{ slug: string }>
}

const siteOrigin = 'https://1031260154.github.io'
const repoBase = '/furinablog'
const siteUrl = `${siteOrigin}${repoBase}`

const secondaryButtonClass =
  'inline-flex items-center rounded-full border-2 border-slate-400 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-950'

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

function buildCoverImageUrl(coverImage?: string) {
  const safeCover = coverImage?.replace(/^\/+/, '') || 'images/cover-1.png'
  return `${siteUrl}/${safeCover.startsWith('images/') ? safeCover : `images/${safeCover}`}`
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
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const postUrl = `/posts/${post.slug}/`
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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: new Date(post.createdAt).toISOString(),
    dateModified: new Date(post.createdAt).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    mainEntityOfPage: `${siteUrl}/posts/${post.slug}/`,
    image: [buildCoverImageUrl(post.coverImage)],
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Header />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            首页
          </Link>
          <span>/</span>
          <span className="line-clamp-1 text-slate-700">{post.title}</span>
        </div>

        <article className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{formatDate(post.createdAt)}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{post.readingTime} 分钟阅读</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{post.author}</span>
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{post.summary}</p>
            </div>

            {post.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
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

            {getCoverImageSrc(basePath, post.coverImage) ? (
              <PostCoverImage
                src={getCoverImageSrc(basePath, post.coverImage)!}
                alt={post.title}
                priority
                sizes="(min-width: 1024px) 896px, 100vw"
              />
            ) : null}
          </div>
        </article>

        <section className="mt-8 rounded-3xl border-2 border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10 md:py-10">
          <MarkdownRenderer content={post.content} />
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">上一篇</p>
            {olderPost ? (
              <>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">{olderPost.title}</h2>
                <Link href={`/posts/${olderPost.slug}`} className={`${secondaryButtonClass} mt-5`}>
                  打开上一篇
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-600">这已经是最早的一篇文章了。</p>
            )}
          </div>

          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">下一篇</p>
            {newerPost ? (
              <>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">{newerPost.title}</h2>
                <Link href={`/posts/${newerPost.slug}`} className={`${secondaryButtonClass} mt-5`}>
                  打开下一篇
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-600">这已经是最新的一篇文章了。</p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}