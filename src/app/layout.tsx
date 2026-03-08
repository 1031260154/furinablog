import type { Metadata } from 'next'
import './globals.css'

const siteName = 'Furinablog'
const siteDescription = '一个使用 Next.js 构建并发布到 GitHub Pages 的静态博客。'
const siteOrigin = 'https://1031260154.github.io'
const repoBase = '/furinablog'
const siteUrl = `${siteOrigin}${repoBase}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: ['博客', '静态博客', 'Next.js', 'GitHub Pages', 'Markdown'],
  authors: [{ name: '梁世豪' }],
  creator: '梁世豪',
  publisher: 'Furinablog',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: '/images/cover-1.png',
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
    images: ['/images/cover-1.png'],
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