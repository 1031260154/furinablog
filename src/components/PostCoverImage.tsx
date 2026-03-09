import Image from 'next/image'

type Props = {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
}

export default function PostCoverImage({
  src,
  alt,
  priority = false,
  sizes = '(min-width: 768px) 50vw, 100vw',
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100">
      <div className="relative h-56 w-full md:h-64">
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