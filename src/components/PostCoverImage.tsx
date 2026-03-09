import Image from 'next/image'

type Props = {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  className?: string
}

export default function PostCoverImage({
  src,
  alt,
  priority = false,
  sizes = '(min-width: 1024px) 960px, 100vw',
  className = '',
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border-2 border-slate-200 bg-slate-100 ${className}`}
    >
      <div className="relative h-[220px] w-full md:h-[320px]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  )
}