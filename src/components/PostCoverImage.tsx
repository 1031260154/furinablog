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
  sizes = '(min-width: 1024px) 960px, 100vw',
}: Props) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  )
}