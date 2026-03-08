import Link from 'next/link'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-slate-900 text-sm font-semibold text-white">
            F
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-slate-900">
              FURINABLOG
            </p>
            <p className="text-xs text-slate-500">个人博客</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}