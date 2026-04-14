import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

export const revalidate = 60

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(id, name, slug)')
    .order('created_at', { ascending: false })
    .limit(8)

  const items = (products ?? []) as Product[]

  // Group color variants by model_slug (from items in preview)
  const byModel = new Map<string, { id: string; slug: string; color: string | null }[]>()
  for (const p of items) {
    if (!p.model_slug) continue
    const group = byModel.get(p.model_slug) ?? []
    group.push({ id: p.id, slug: p.slug, color: p.color })
    byModel.set(p.model_slug, group)
  }

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative w-full h-screen bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/hero-banner.png)`,
          }}
        />

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 gap-4">
          <p className="text-[12px] uppercase tracking-[0.3em] text-white/80">
            Новая коллекция
          </p>
          <Link
            href="/catalog"
            className="border border-white text-white text-[12px] uppercase tracking-[0.2em] px-8 py-3 hover:bg-white hover:text-black transition-colors duration-200"
          >
            Смотреть
          </Link>
        </div>
      </section>

      {/* CATALOG PREVIEW */}
      <section className="pt-20">
        <div className="px-6 mb-10 flex items-center justify-between">
          <p className="text-[12px] uppercase tracking-[0.2em] text-gray-400">Каталог</p>
          <Link href="/catalog" className="text-[12px] uppercase tracking-[0.2em] text-black hover:text-gray-500 transition-colors">
            Все товары →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-0 gap-y-16 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              colorVariants={product.model_slug ? byModel.get(product.model_slug) : undefined}
            />
          ))}
        </div>
      </section>

    </main>
  )
}
