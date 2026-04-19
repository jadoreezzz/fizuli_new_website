'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'
import { COLOR_MAP, isLightColor } from '@/lib/colors'
import { useCart } from '@/lib/cart'
import ProductCard from '@/components/ProductCard'
import SizeGuideModal from '@/components/SizeGuideModal'

interface ProductDetailProps {
  product: Product
  recommended?: Product[]
  colorVariants?: Product[]
  recommendedColorVariants?: Map<string, { id: string; slug: string; color: string | null }[]>
}

const TABS = ['ИНФОРМАЦИЯ О ТОВАРЕ', 'ДОСТАВКА И ВОЗВРАТ'] as const


export default function ProductDetail({ product, recommended = [], colorVariants = [], recommendedColorVariants }: ProductDetailProps) {
  const images = (product.images ?? []).slice(0, 5)
  const variants = product.product_variants ?? []

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<0 | 1>(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const { addItem } = useCart()

  const hasSizeGuide = product.model_slug?.startsWith('kostyum-sportivnyy-iz-zhatoy-tkani')
  const router = useRouter()

  const price = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(product.price) + ' р.'

  // editorial images = everything after the first
  const editorialImages = images.slice(1)

  return (
    <>
    <div className="bg-[#fffffd] min-h-screen">

      {/* TOP SECTION — main image + info panel */}
      <div className="flex flex-col lg:flex-row">

        {/* LEFT — main image */}
        <div className="lg:w-1/2">
          <div className="relative aspect-[3/4] bg-[#fffffd]">
            {images[0] && (
              <Image
                src={images[0]}
                alt={product.name}
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>

        {/* RIGHT — sticky info */}
        <div className="lg:w-1/2 lg:sticky lg:top-0 lg:self-start px-8 py-10 flex flex-col">

          <button
            onClick={() => router.back()}
            className="self-start text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-6"
          >
            ← Назад
          </button>

          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-[14px] uppercase tracking-[0.18em] text-black font-medium">
                {product.name}
              </p>
              {product.article && (
                <p className="text-[11px] text-gray-400 tracking-wide mt-1">
                  Арт. {product.article}
                </p>
              )}
            </div>
            <p className="text-[15px] tracking-wide text-black">{price}</p>
          </div>

          {/* Color variants */}
          {colorVariants.length > 1 && (
            <div className="mt-6">
              <p className="text-[14px] uppercase tracking-widest text-gray-400 mb-3">
                Цвет:{' '}
                <span className="text-black">{product.color ?? ''}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {colorVariants.map((v) => {
                  const isCurrent = v.id === product.id
                  const hex = COLOR_MAP[(v.color ?? '').toLowerCase()] ?? '#cccccc'
                  const isLight = isLightColor(hex)
                  return (
                    <Link
                      key={v.id}
                      href={`/catalog/${v.slug}`}
                      title={v.color ?? v.name}
                      className={`block w-7 h-7 rounded-full transition-all duration-150 ${
                        isCurrent
                          ? 'ring-2 ring-black ring-offset-2'
                          : isLight
                            ? 'ring-1 ring-gray-300 hover:ring-gray-500 hover:ring-offset-1'
                            : 'ring-1 ring-transparent hover:ring-gray-400 hover:ring-offset-1'
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  )
                })}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 my-6" />

          {/* Sizes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[14px] uppercase tracking-widest text-gray-400">Размер</p>
              <div className="flex items-center gap-4">
                {hasSizeGuide && (
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[14px] uppercase tracking-widest text-gray-400 underline underline-offset-2 hover:text-black transition-colors"
                  >
                    Таблица размеров
                  </button>
                )}
                <a
                  href="https://t.me/fizuli_sales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] uppercase tracking-widest text-gray-400 underline underline-offset-2 hover:text-black transition-colors"
                >
                  Написать менеджеру
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {variants.map((v) => {
                const outOfStock = v.stock === 0
                const selected = selectedSize === v.size
                return (
                  <button
                    key={v.id}
                    onClick={() => !outOfStock && setSelectedSize(v.size)}
                    disabled={outOfStock}
                    className={`
                      h-9 min-w-[44px] px-3 text-[14px] tracking-widest uppercase border transition-colors duration-150
                      ${selected
                        ? 'border-black bg-black text-white'
                        : outOfStock
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                          : 'border-gray-300 text-black hover:border-black'
                      }
                    `}
                  >
                    {v.size}
                  </button>
                )
              })}
            </div>
          </div>

          {!selectedSize ? (
            <div className="mt-6 h-12 flex items-center justify-center border border-gray-200">
              <p className="text-[14px] uppercase tracking-[0.2em] text-gray-400">Выберите размер</p>
            </div>
          ) : (
            <div className="flex gap-3 mt-6">
              <div className="flex items-center border border-gray-200">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center text-[16px] text-gray-500 hover:text-black transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center text-[14px] tracking-wide">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-12 flex items-center justify-center text-[16px] text-gray-500 hover:text-black transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < qty; i++) {
                    addItem({
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      price: product.price,
                      image: product.images?.[0] ?? '',
                      size: selectedSize,
                      color: product.color,
                    })
                  }
                  setAdded(true)
                  setTimeout(() => setAdded(false), 2000)
                }}
                className={`flex-1 h-12 text-[14px] uppercase tracking-[0.2em] transition-colors duration-150 ${
                  added ? 'bg-gray-700 text-white' : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {added ? 'Добавлено ✓' : 'Добавить в корзину'}
              </button>
            </div>
          )}

          <div className="border-t border-gray-200 mt-8" />

          {/* Tabs */}
          <div className="flex gap-8 mt-6">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i as 0 | 1)}
                className={`text-[14px] uppercase tracking-widest pb-1 border-b transition-colors duration-150 ${
                  activeTab === i
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-5 text-[14px] leading-6 text-gray-600">
            {activeTab === 0 ? (
              <div className="space-y-5">
                {product.description
                  ? product.description.split('\n\n').map((block, i) => {
                      const lines = block.split('\n').filter(Boolean)
                      if (lines.length === 0) return null
                      const [heading, ...body] = lines
                      // Если блок — одна строка без признаков заголовка, рендерим как обычный текст
                      const isHeading = body.length > 0 || heading.endsWith(':')
                      if (!isHeading) {
                        return (
                          <p key={i} className="text-gray-500 leading-6">{heading}</p>
                        )
                      }
                      return (
                        <div key={i}>
                          <p className="text-[14px] uppercase tracking-widest text-black mb-2">{heading.replace(/:$/, '')}</p>
                          {body.map((line, j) => (
                            <p key={j} className="text-gray-500 leading-6">{line}</p>
                          ))}
                        </div>
                      )
                    })
                  : <p className="text-gray-500">Описание отсутствует.</p>
                }
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-[14px] uppercase tracking-widest text-black mb-2">Курьерская доставка — СДЭК</p>
                  <p className="mb-1">Осуществляется по 100% предоплате.</p>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-500">
                    <li>Стоимость зависит от удалённости пункта СДЭК</li>
                    <li>При заказе свыше 15 000 ₽ — доставка бесплатная</li>
                    <li>Время работы: ежедневно с 12:00 до 17:00</li>
                  </ul>
                  <table className="mt-3 w-full text-[14px]">
                    <tbody>
                      <tr className="border-t border-gray-100"><td className="py-1.5 text-gray-500 pr-4">Товар есть на складе</td><td className="py-1.5">1–2 рабочих дня</td></tr>
                      <tr className="border-t border-gray-100"><td className="py-1.5 text-gray-500 pr-4">Требуется отшив</td><td className="py-1.5">до 30 рабочих дней</td></tr>
                      <tr className="border-t border-gray-100 border-b border-gray-100"><td className="py-1.5 text-gray-500 pr-4">Период распродаж</td><td className="py-1.5">+3–4 рабочих дня</td></tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <p className="text-[14px] uppercase tracking-widest text-black mb-2">Самовывоз</p>
                  <p className="mb-1">Москва, Остаповский проезд, д. 3с6</p>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-500">
                    <li>Самовывоз бесплатный</li>
                    <li>Менеджер свяжется, когда заказ будет готов</li>
                    <li>Неоплаченный заказ хранится 24 часа</li>
                    <li>Оплаченный заказ хранится 7 календарных дней</li>
                  </ul>
                </div>

                <div>
                  <p className="text-[14px] uppercase tracking-widest text-black mb-2">Международная доставка — EMS</p>
                  <p className="text-gray-500">Стоимость рассчитывается индивидуально.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* EDITORIAL GRID */}
      {editorialImages.length > 0 && (
        <div className="grid grid-cols-2">
          {editorialImages.map((src, i) => (
            <div key={i} className="relative aspect-[3/4] bg-[#fffffd]">
              <Image src={src} alt={product.name} fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* RECOMMENDED PRODUCTS */}
      {recommended.length > 0 && (
        <div className="mt-24 pb-16">
          <p className="text-center text-[16px] uppercase tracking-[0.25em] text-black mb-10">
            Рекомендуем
          </p>
          <div className="grid grid-cols-2 gap-x-0 gap-y-16 md:grid-cols-3 lg:grid-cols-4">
            {recommended.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                colorVariants={p.model_slug ? recommendedColorVariants?.get(p.model_slug) : undefined}
              />
            ))}
          </div>
        </div>
      )}

    </div>
    {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}
    </>
  )
}
