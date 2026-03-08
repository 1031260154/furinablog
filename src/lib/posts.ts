import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export type PostMeta = {
  title: string
  slug: string
  summary: string
  createdAt: string
  coverImage?: string
  author: string
  tags: string[]
  readingTime: number
}

export type Post = PostMeta & {
  content: string
}

type RawFrontmatter = {
  title?: unknown
  slug?: unknown
  summary?: unknown
  createdAt?: unknown
  coverImage?: unknown
  author?: unknown
  tags?: unknown
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[>#*_~\-]+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim()
}

function getReadingTime(content: string) {
  const plainText = stripMarkdown(content)
  const chineseCharCount = (plainText.match(/[\u4e00-\u9fff]/g) || []).length
  const otherWordCount = plainText
    .replace(/[\u4e00-\u9fff]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

  const totalUnits = chineseCharCount + otherWordCount
  return Math.max(1, Math.ceil(totalUnits / 300))
}

function normalizeSlug(fileName: string, frontmatterSlug?: string) {
  if (frontmatterSlug && frontmatterSlug.trim()) {
    return frontmatterSlug.trim()
  }

  return fileName.replace(/\.md$/i, '')
}

function normalizeFrontmatter(fileName: string, data: RawFrontmatter, content: string): Post {
  const title = typeof data.title === 'string' ? data.title.trim() : '未命名文章'
  const slug = normalizeSlug(fileName, typeof data.slug === 'string' ? data.slug : undefined)
  const summary = typeof data.summary === 'string' ? data.summary.trim() : ''
  const createdAt =
    typeof data.createdAt === 'string' ? data.createdAt : new Date().toISOString()
  const coverImage =
    typeof data.coverImage === 'string' && data.coverImage.trim()
      ? data.coverImage.trim()
      : undefined
  const author =
    typeof data.author === 'string' && data.author.trim() ? data.author.trim() : '站长'
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === 'string')
    : []

  return {
    title,
    slug,
    summary,
    createdAt,
    coverImage,
    author,
    tags,
    content,
    readingTime: getReadingTime(content),
  }
}

async function readPostFile(fileName: string) {
  const filePath = path.join(postsDirectory, fileName)
  const fileContent = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return normalizeFrontmatter(fileName, data as RawFrontmatter, content)
}

export async function getAllPosts() {
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)

  const posts = await Promise.all(files.map(readPostFile))

  return posts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts.map(({ content, ...postMeta }) => postMeta)
}

export async function getAllPostSlugs() {
  const posts = await getAllPostsMeta()
  return posts.map((post) => post.slug)
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts()
  return posts.find((post) => post.slug === slug) ?? null
}