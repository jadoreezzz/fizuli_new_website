'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { COLOR_MAP, isLightColor } from '@/lib/colors'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'

const FREE_SHIPPING = 15000

interface CartContentProps {
  recommended: Product[]
}

export default function CartContent({ recommended }: CartContentProps) {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart()

  const remaining = Math.max(0, FREE_SHIPPING - total)
  const progress = Math.min(100, (total / FREE_SHIPPING) * 100)

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n) + ' р.'

  return (
    <main className="bg-[#fffffd] min-h-screen">
      {/* Header row */}
      <div className="px-6 md:px-10 pt-10 pb-6 flex items-baseline justify-between border-b border-gray-100">
        <h1 className="text-[16px] uppercase tracking-[0.25em] font-medium">
          Корзина
          {items.length > 0 && (
            <span className="ml-2 text-gray-400">({items.length})</span>
          )}
        </h1>
        <div className="flex items-center gap-6">
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              Очистить корзину
            </button>
          )}
          <Link href="/catalog" className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
            Продолжить покупки →
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        /* ── EMPTY STATE ── */
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <p className="text-[16px] uppercase tracking-[0.2em] font-medium">Ваша корзина пуста</p>
          <p className="text-[14px] text-gray-400 text-center leading-relaxed">
            Вы пока ничего не добавили в вашу корзину.
          </p>
          <Link
            href="/catalog"
            className="mt-2 bg-black text-white text-[11px] uppercase tracking-[0.2em] px-10 py-3 hover:bg-gray-900 transition-colors"
          >
            Выбрать товары
          </Link>
        </div>
      ) : (
        /* ── FILLED STATE ── */
        <div className="px-6 md:px-10 pt-8 pb-16 flex flex-col lg:flex-row gap-10">

          {/* LEFT — items */}
          <div className="flex-1 min-w-0">
            {/* Shipping progress */}
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                {remaining === 0
                  ? 'Доступна бесплатная доставка'
                  : `До бесплатной доставки ${fmt(remaining)}`}
              </p>
              <div className="h-px bg-gray-200 w-full relative">
                <div
                  className="absolute top-0 left-0 h-px bg-black transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Items list */}
            <div className="flex flex-col divide-y divide-gray-100">
              {items.map((entry) => {
                const hex = COLOR_MAP[(entry.color ?? '').toLowerCase()] ?? null
                const light = hex ? isLightColor(hex) : false
                return (
                  <div key={`${entry.productId}::${entry.size}`} className="py-6 flex gap-5">
                    {/* Image */}
                    <Link href={`/catalog/${entry.slug}`} className="shrink-0">
                      <div className="relative w-48 h-64 bg-[#fffffd] overflow-hidden">
                        {entry.image && (
                          <Image
                            src={entry.image}
                            alt={entry.name}
                            fill
                            sizes="192px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                      <Link href={`/catalog/${entry.slug}`} className="text-[14px] tracking-wide text-black hover:text-gray-500 transition-colors truncate">
                        {entry.name}
                      </Link>
                      <p className="text-[11px] uppercase tracking-widest text-gray-400">
                        Размер: <span className="text-black">{entry.size}</span>
                      </p>
                      {entry.color && (
                        <div className="flex items-center gap-2">
                          <p className="text-[11px] uppercase tracking-widest text-gray-400">Цвет:</p>
                          {hex && (
                            <span
                              className={`w-3 h-3 rounded-full inline-block shrink-0 ${light ? 'ring-1 ring-gray-300' : ''}`}
                              style={{ backgroundColor: hex }}
                            />
                          )}
                          <span className="text-[11px] uppercase tracking-widest text-black">{entry.color}</span>
                        </div>
                      )}

                      {/* Quantity + price row */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 border border-gray-200">
                          <button
                            onClick={() => updateQuantity(entry.productId, entry.size, -1)}
                            className="w-8 h-8 flex items-center justify-center text-[14px] text-gray-500 hover:text-black transition-colors"
                          >
                            −
                          </button>
                          <span className="text-[14px] w-4 text-center">{entry.quantity}</span>
                          <button
                            onClick={() => updateQuantity(entry.productId, entry.size, 1)}
                            className="w-8 h-8 flex items-center justify-center text-[14px] text-gray-500 hover:text-black transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-[14px] tracking-wide">{fmt(entry.price * entry.quantity)}</p>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(entry.productId, entry.size)}
                      className="shrink-0 self-start text-gray-300 hover:text-black transition-colors text-[16px] leading-none mt-0.5"
                      aria-label="Удалить"
                    >
                      ×
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT — summary */}
          <div className="lg:w-72 shrink-0">
            <div className="border border-gray-100 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-widest text-gray-400">Итого к оплате</p>
                <p className="text-[13px] tracking-wide font-medium">{fmt(total)}</p>
              </div>
              {remaining > 0 && (
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  До бесплатной доставки {fmt(remaining)}
                </p>
              )}
              <button className="w-full h-11 bg-black text-white text-[11px] uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors">
                Перейти к оформлению
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ДОПОЛНИТЬ ОБРАЗ */}
      {recommended.length > 0 && (
        <div className="pb-16">
          <p className="text-center text-[16px] uppercase tracking-[0.25em] text-black mb-10">
            Дополнить образ
          </p>
          <div className="grid grid-cols-2 gap-x-0 gap-y-16 md:grid-cols-3 lg:grid-cols-4">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
