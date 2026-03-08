import Link from 'next/link'
import Header from '@/components/Header'
import { posts } from '@/data/posts'

function getBasePath() {
  return process.env.NODE_ENV === 'production' ? '/furinablog' : ''
}

export default function HomePage() {
  const basePath = getBasePath()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <section className="mb-10 rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-4xl font-bold">欢迎来到我的个人博客</h1>
          <p className="text-gray-600">
            这里会分享技术学习、项目实践和个人思考。
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">最新文章</h2>

          {posts.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-gray-500 shadow-sm">
              暂无文章
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  {post.coverImage ? (
                    <img
                      src={`${basePath}/images/${post.coverImage}`}
                      alt={post.title}
                      className="mb-4 h-56 w-full rounded-xl object-cover"
                    />
                  ) : null}

                  <h3 className="mb-2 text-xl font-bold">{post.title}</h3>

                  <p className="mb-3 text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                  </p>

                  <p className="mb-4 text-gray-700">{post.summary}</p>

                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    阅读全文
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}