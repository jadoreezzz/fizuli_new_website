import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

export const revalidate = 60

export default async function CatalogPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(id, name, slug)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
  }

  const items = (products ?? []) as Product[]

  return (
    <main className="bg-white min-h-screen">
      <div className="px-6 py-16">
        <h1 className="text-[12px] uppercase tracking-[0.2em] text-gray-400 mb-14">
          Каталог
        </h1>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-400 px-6">Товары не найдены</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-0 gap-y-16 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}
