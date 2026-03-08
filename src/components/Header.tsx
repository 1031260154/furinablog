import Link from 'next/link'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold tracking-wide text-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
            FB
          </span>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
              Personal Blog
            </p>
            <p className="text-lg font-semibold text-slate-900">Furinablog</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 p-1.5 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900"
        >
          返回首页
        </Link>
      </div>
    </header>
  )
}
