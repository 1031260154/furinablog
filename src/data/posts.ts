export type StaticPost = {
  id: number
  title: string
  slug: string
  summary: string
  content: string
  coverImage: string
  createdAt: string
  author: {
    name: string
  }
}

export const posts: StaticPost[] = [
  {
    id: 1,
    title: '欢迎来到我的静态博客',
    slug: 'welcome-to-my-static-blog',
    summary: '这是第一篇文章，用来测试 GitHub Pages 静态部署。',
    coverImage: 'cover-1.png',
    createdAt: '2026-03-08',
    author: {
      name: '站长',
    },
    content: `# 欢迎来到我的静态博客

这是我的第一篇静态文章。

## 这个博客现在有什么特点

- 没有后端
- 没有数据库
- 托管在 GitHub Pages
- 使用 Next.js 静态导出

## 为什么这样做

因为这样部署简单、成本低，而且适合展示型博客。

**这是一段加粗文字。**

## 一段代码示例

\`\`\`ts
const message = 'Hello GitHub Pages'
console.log(message)
\`\`\`
`,
  },
  {
    id: 2,
    title: '第二篇测试文章',
    slug: 'second-test-post',
    summary: '这篇文章用于测试首页列表和详情页跳转。',
    coverImage: 'cover-2.jpg',
    createdAt: '2026-03-08',
    author: {
      name: '站长',
    },
    content: `# 第二篇测试文章

这里是第二篇文章内容。

## Markdown 示例

### 列表

1. 首页显示文章卡片
2. 点击进入详情页
3. 正文按 Markdown 渲染

### 引用

> 这是一个引用块。

### 加粗

**这是一段强调内容。**
`,
  },
]