'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Product, ProductVariant } from '@/types'
import { COLOR_MAP, isLightColor } from '@/lib/colors'
import { useCart } from '@/lib/cart'

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
  const [popupOpen, setPopupOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { addItem } = useCart()

  const image1 = product.images?.[0] ?? null
  const image2 = product.images?.[1] ?? null
  const variants: ProductVariant[] = product.product_variants ?? []

  const price = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(product.price) + ' р.'
  const showSwatches = colorVariants.length > 1

  // Close popup on outside click
  useEffect(() => {
    if (!popupOpen) return
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [popupOpen])

  function handleAddToCart(size: string) {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? '',
      size,
      color: product.color,
    })
    setPopupOpen(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  function handleButtonClick() {
    if (variants.length === 0) {
      router.push(`/catalog/${product.slug}`)
      return
    }
    setPopupOpen(true)
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative">
        <Link href={`/catalog/${product.slug}`} className="block">
          <div
            className="relative aspect-[3/4] overflow-hidden"
            style={{ backgroundColor: '#fffffd' }}
          >
            {image1 && (
              <Image
                src={image1}
                alt={product.name}
                fill
                sizes="25vw"
                className="object-cover"
                style={{
                  transform: hovered ? 'scale(1.05)' : 'scale(1)',
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
                  transform: hovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 200ms ease-in-out',
                  visibility: hovered ? 'visible' : 'hidden',
                }}
              />
            )}
          </div>
        </Link>

        {/* Color swatches */}
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

      {/* Info + button */}
      <div className="mt-3 px-3">
        {/* Badge row — same height as name for layout consistency */}
        <p className="text-[14px] tracking-wide mb-1" style={{ color: '#f600ff', minHeight: '1.25rem' }}>
          {product.model_slug?.includes('kostyum') ? 'НОВИНКА' : ''}
        </p>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <p className="text-[14px] tracking-wide text-gray-900 truncate uppercase">
              {product.name}
            </p>
          </div>
          <p className="shrink-0 text-[15px] tracking-wide text-gray-900">
            {price}
          </p>
        </div>

        <div ref={popupRef}>
          {/* Size popup — inline, expands card downward */}
          {popupOpen && (
            <div className="mb-2 border border-gray-200 p-3">
              <div className="flex flex-wrap gap-1.5">
                {variants.map((v) => {
                  const outOfStock = v.stock === 0
                  return (
                    <button
                      key={v.id}
                      disabled={outOfStock}
                      onClick={() => handleAddToCart(v.size)}
                      className={`h-8 min-w-[40px] px-2.5 text-[11px] tracking-widest uppercase border transition-colors duration-150 ${
                        outOfStock
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                          : 'border-gray-300 text-black hover:border-black hover:bg-black hover:text-white'
                      }`}
                    >
                      {v.size}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <button
            onClick={handleButtonClick}
            className={`block w-full text-center border text-[11px] uppercase tracking-[0.2em] py-2.5 transition-colors duration-150 ${
              added
                ? 'border-black bg-black text-white'
                : popupOpen
                  ? 'border-black text-black'
                  : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
            }`}
          >
            {added ? 'Добавлено' : popupOpen ? 'Выберите размер' : 'В корзину'}
          </button>
        </div>
      </div>
    </div>
  )
}
