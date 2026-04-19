'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  article: string | null
  product_variants?: { id: string; size: string; stock: number }[]
}

interface SearchModalProps {
  onClose: () => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [featured, setFeatured] = useState<Product[]>([])
  const [popupProductId, setPopupProductId] = useState<string | null>(null)
  const [added, setAdded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { addItem } = useCart()

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n) + ' р.'

  // Load featured products on mount
  useEffect(() => {
    inputRef.current?.focus()
    fetch('/api/search')
      .then(r => r.json())
      .then(data => {
        setFeatured(Array.isArray(data) ? data as Product[] : [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Search featured error:', err)
        setLoading(false)
      })
  }, [])

  async function handleSearch() {
    if (!query.trim()) { setResults([]); return }
    const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
    const data = await res.json()
    setResults(Array.isArray(data) ? data as Product[] : [])
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const displayedProducts = results.length > 0 ? results : featured
  const suggestions = featured.map(p => p.name)

  function handleAddToCart(product: Product, size: string) {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? '',
      size,
      color: null,
    })
    setPopupProductId(null)
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1500)
  }

  function navigate(slug: string) {
    onClose()
    router.push(`/catalog/${slug}`)
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#fffffd] flex overflow-hidden">

      {/* LEFT SIDEBAR */}
      <div className="w-64 shrink-0 border-r border-gray-100 flex flex-col">
        {/* Search input */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="shrink-0 text-gray-400">
            <circle cx="6.5" cy="6.5" r="4.5"/>
            <line x1="10.5" y1="10.5" x2="14" y2="14"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
            placeholder="Например, Анорак"
            className="flex-1 text-[13px] bg-transparent outline-none text-black placeholder-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-black text-[16px] leading-none">×</button>
          )}
        </div>

        {/* Suggestions */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">Рекомендуемые товары</p>
          <ul className="flex flex-col gap-2.5">
            {suggestions.map((name, i) => (
              <li key={i}>
                <button
                  onClick={() => setQuery(name)}
                  className="text-[13px] text-gray-800 hover:text-black transition-colors text-left"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
            {results.length > 0 ? `Результаты: «${query}»` : 'Возможно, вы ищете:'}
          </p>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors text-[20px] leading-none">×</button>
        </div>

        {/* Results grid */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {loading ? (
            <p className="text-[13px] text-gray-400 uppercase tracking-widest">Загрузка...</p>
          ) : displayedProducts.length === 0 && query.trim() ? (
            <p className="text-[13px] text-gray-400 uppercase tracking-widest">Ничего не найдено</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-0 gap-y-10">
              {displayedProducts.map(product => {
                const variants = product.product_variants ?? []
                const isPopupOpen = popupProductId === product.id
                const isAdded = added === product.id
                return (
                  <div key={product.id}>
                    <button onClick={() => navigate(product.slug)} className="block w-full text-left">
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#fffffd]">
                        {product.images?.[0] && (
                          <Image src={product.images[0]} alt={product.name} fill sizes="20vw" className="object-cover" />
                        )}
                      </div>
                    </button>
                    <div className="mt-3 px-2">
                      <p className="text-[13px] text-gray-900 uppercase tracking-wide truncate">{product.name}</p>
                      <p className="text-[13px] text-gray-700 mt-0.5">{fmt(product.price)}</p>

                      {/* Size popup + button */}
                      <div className="mt-2">
                        {isPopupOpen && (
                          <div className="mb-1.5 border border-gray-200 p-2 flex flex-wrap gap-1">
                            {variants.map(v => (
                              <button
                                key={v.id}
                                disabled={v.stock === 0}
                                onClick={() => handleAddToCart(product, v.size)}
                                className={`h-7 min-w-[36px] px-2 text-[10px] tracking-widest uppercase border transition-colors ${
                                  v.stock === 0
                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                    : 'border-gray-300 text-black hover:border-black hover:bg-black hover:text-white'
                                }`}
                              >
                                {v.size}
                              </button>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => {
                            if (variants.length === 0) { navigate(product.slug); return }
                            setPopupProductId(isPopupOpen ? null : product.id)
                          }}
                          className={`w-full text-center border text-[10px] uppercase tracking-[0.2em] py-2 transition-colors ${
                            isAdded
                              ? 'border-black bg-black text-white'
                              : isPopupOpen
                                ? 'border-black text-black'
                                : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
                          }`}
                        >
                          {isAdded ? 'Добавлено' : isPopupOpen ? 'Выберите размер' : 'В корзину'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
