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

  // Fetch color variants (same model_slug, different products)
  let colorVariants: Product[] = []
  if (product.model_slug) {
    const { data: variants } = await supabase
      .from('products')
      .select('id, name, slug, color, images, categories(id, name, slug), model_slug')
      .eq('model_slug', product.model_slug)
      .order('created_at', { ascending: true })
    colorVariants = (variants ?? []) as unknown as Product[]
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

  return <ProductDetail product={product} recommended={recommendedProducts} colorVariants={colorVariants} />
}
