'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Product } from '@/types'
import { COLOR_MAP, isLightColor } from '@/lib/colors'

interface ColorSwatch {
  id: string
  slug: string
  color: string | null
}

interface ProductCardProps {
  product: Product
  colorVariants?: ColorSwatch[]
}

export default function ProductCard({ product, colorVariants = [] }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  const image1 = product.images?.[0] ?? null
  const image2 = product.images?.[1] ?? null

  const price = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(product.price) + ' р.'

  const showSwatches = colorVariants.length > 1

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area — relative wrapper so swatches can overlay */}
      <div className="relative">
        <Link href={`/catalog/${product.slug}`} className="block">
          <div
            className="relative aspect-[3/4] overflow-hidden"
            style={{ backgroundColor: '#f5f5f5' }}
          >
            {image1 && (
              <Image
                src={image1}
                alt={product.name}
                fill
                sizes="25vw"
                className="object-cover"
                style={{
                  transform: hovered ? 'scale(1.15)' : 'scale(1)',
                  transition: 'transform 200ms ease-in-out',
                  visibility: hovered && image2 ? 'hidden' : 'visible',
                }}
              />
            )}
            {image2 && (
              <Image
                src={image2}
                alt={product.name}
                fill
                sizes="25vw"
                className="object-cover"
                style={{
                  transform: hovered ? 'scale(1.15)' : 'scale(1)',
                  transition: 'transform 200ms ease-in-out',
                  visibility: hovered ? 'visible' : 'hidden',
                }}
              />
            )}
          </div>
        </Link>

        {/* Swatches — outside the <Link>, overlaid via absolute */}
        {showSwatches && (
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 flex items-center gap-1.5 pointer-events-none">
            {colorVariants.map((v) => {
              const isCurrent = v.id === product.id
              const hex = COLOR_MAP[(v.color ?? '').toLowerCase()] ?? '#cccccc'
              const light = isLightColor(hex)
              return (
                <button
                  key={v.id}
                  title={v.color ?? ''}
                  onClick={() => router.push(`/catalog/${v.slug}`)}
                  className={`pointer-events-auto block w-4 h-4 rounded-full shrink-0 transition-all duration-150 ${
                    isCurrent
                      ? 'ring-2 ring-white ring-offset-1 ring-offset-transparent scale-110'
                      : light
                        ? 'ring-1 ring-gray-400 opacity-70 hover:opacity-100 hover:scale-110'
                        : 'opacity-70 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: hex }}
                />
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-2 px-3">
        <div className="min-w-0">
          <p className="text-[12px] tracking-wide text-gray-900 truncate">
            {product.name}
          </p>
        </div>
        <p className="shrink-0 text-[12px] tracking-wide text-gray-900">
          {price}
        </p>
      </div>
    </div>
  )
}
