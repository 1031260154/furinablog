import Link from 'next/link'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-indigo-500 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform duration-300 group-hover:scale-105">
            F
          </span>

          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-sky-600">FURINABLOG</p>
            <p className="text-sm text-slate-500">记录学习、项目和长期思考</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 p-1 text-sm text-slate-600 shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 font-medium transition hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}