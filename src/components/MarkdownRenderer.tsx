import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  content: string
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-10 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-950">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mt-6 text-[17px] leading-8 text-slate-700">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mt-6 list-disc space-y-3 pl-6 text-[17px] leading-8 text-slate-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-6 list-decimal space-y-3 pl-6 text-[17px] leading-8 text-slate-700">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-6 rounded-r-2xl border-l-4 border-sky-300 bg-sky-50 px-5 py-3 text-slate-700">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-10 border-slate-200" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-950">{children}</strong>
          ),
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http')

            return (
              <a
                href={href}
                {...props}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className="font-medium text-sky-700 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-900"
              >
                {children}
              </a>
            )
          },
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm leading-7 text-slate-100">
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className)

            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }

            return (
              <code
                className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.95em] text-slate-900"
                {...props}
              >
                {children}
              </code>
            )
          },
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src || ''}
              alt={alt || ''}
              className="my-8 rounded-2xl border border-slate-200"
            />
          ),
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
          th: ({ children }) => (
            <th className="border border-slate-200 px-4 py-3 font-semibold text-slate-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-slate-200 px-4 py-3 text-slate-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}