import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProductDetail from '@/components/ProductDetail'
import { Product } from '@/types'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params

  const { data, error } = await supabase
    .from('products')
    .select('*, categories(id, name, slug), product_variants(id, product_id, size, stock)')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    notFound()
  }

  const product = data as Product

  // Sort variants by size order
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
  if (product.product_variants) {
    product.product_variants.sort(
      (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
    )
  }

  // Fetch 4 recommended products (same category, excluding current)
  const { data: recommended } = await supabase
    .from('products')
    .select('*, categories(id, name, slug)')
    .eq('category_id', product.category_id ?? '')
    .neq('id', product.id)
    .limit(4)

  // If not enough in same category, fill from others
  let recommendedProducts = (recommended ?? []) as Product[]
  if (recommendedProducts.length < 4) {
    const { data: others } = await supabase
      .from('products')
      .select('*, categories(id, name, slug)')
      .neq('id', product.id)
      .not('id', 'in', `(${recommendedProducts.map(p => p.id).join(',')})`)
      .limit(4 - recommendedProducts.length)
    recommendedProducts = [...recommendedProducts, ...((others ?? []) as Product[])]
  }

  return <ProductDetail product={product} recommended={recommendedProducts} />
}
