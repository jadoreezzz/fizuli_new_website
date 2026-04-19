import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

export const revalidate = 60

export default async function CatalogPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(id, name, slug), product_variants(id, size, stock)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
  }

  const items = (products ?? []) as Product[]

  // Group color variants by model_slug
  const byModel = new Map<string, { id: string; slug: string; color: string | null }[]>()
  for (const p of items) {
    if (!p.model_slug) continue
    const group = byModel.get(p.model_slug) ?? []
    group.push({ id: p.id, slug: p.slug, color: p.color })
    byModel.set(p.model_slug, group)
  }

  return (
    <main className="bg-[#fffffd] min-h-screen">
      <div className="px-6 py-16">
        <h1 className="text-[16px] uppercase tracking-[0.2em] text-gray-400 mb-14">
          Каталог
        </h1>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-400 px-6">Товары не найдены</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-0 gap-y-16 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              colorVariants={product.model_slug ? byModel.get(product.model_slug) : undefined}
            />
          ))}
        </div>
      )}
    </main>
  )
}
