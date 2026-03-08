import type { Metadata } from 'next'
import './globals.css'

const siteName = 'Furinablog'
const siteDescription = '一个使用 Next.js 构建并发布到 GitHub Pages 的静态博客。'
const siteUrl = 'https://1031260154.github.io'
const repoBase = '/furinablog'
const defaultImage = `${siteUrl}${repoBase}/images/cover-1.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: ['博客', '静态博客', 'Next.js', 'GitHub Pages'],
  authors: [{ name: 'Furinablog' }],
  creator: 'Furinablog',
  publisher: 'Furinablog',
  alternates: {
    canonical: `${siteUrl}${repoBase}/`,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: `${siteUrl}${repoBase}/`,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [defaultImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}