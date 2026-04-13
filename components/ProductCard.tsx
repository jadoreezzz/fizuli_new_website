'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)

  const image1 = product.images?.[0] ?? null
  const image2 = product.images?.[1] ?? null

  const price = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(product.price)

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative aspect-[3/4] overflow-hidden"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        {/* image1 — видна когда не hovered */}
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

        {/* image2 — видна только при hover */}
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

      <div className="mt-3 flex items-start justify-between gap-2 px-3">
        <div className="min-w-0">
          <p className="text-[12px] uppercase tracking-widest text-gray-400 truncate">
            {product.categories?.name ?? ''}
          </p>
          <p className="mt-0.5 text-[12px] tracking-wide text-gray-900 truncate">
            {product.name}
          </p>
        </div>
        <p className="shrink-0 text-[12px] tracking-wide text-gray-900">
          {price}
        </p>
      </div>
    </Link>
  )
}
