import type { Metadata } from 'next'
import Header from '@/components/Header'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { posts } from '@/data/posts'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{ slug: string }>
}

const siteUrl = 'https://1031260154.github.io'
const repoBase = '/furinablog'

function getBasePath() {
  return process.env.NODE_ENV === 'production' ? '/furinablog' : ''
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return {
      title: '文章不存在',
    }
  }

  const postUrl = `${siteUrl}${repoBase}/posts/${post.slug}/`
  const imageUrl = `${siteUrl}${repoBase}/images/${post.coverImage}`

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
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    notFound()
  }

  const basePath = getBasePath()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <article className="rounded-2xl bg-white p-8 shadow-sm">
          {post.coverImage ? (
            <img
              src={`${basePath}/images/${post.coverImage}`}
              alt={post.title}
              className="mb-6 h-72 w-full rounded-2xl object-cover"
            />
          ) : null}

          <h1 className="mb-3 text-4xl font-bold">{post.title}</h1>

          <p className="mb-3 text-sm text-gray-500">作者：{post.author.name}</p>

          <p className="mb-8 text-sm text-gray-500">
            发布时间：{new Date(post.createdAt).toLocaleDateString('zh-CN')}
          </p>

          <div className="mb-6 rounded-lg bg-gray-100 p-4 text-gray-700">
            {post.summary}
          </div>

          <MarkdownRenderer content={post.content} />
        </article>
      </main>
    </div>
  )
}