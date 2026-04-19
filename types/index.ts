export interface Category {
  id: string
  name: string
  slug: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  cover_image: string | null
}

export interface ProductVariant {
  id: string
  product_id: string
  size: string
  stock: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  images: string[]
  category_id: string | null
  collection_id: string | null
  color: string | null
  model_slug: string | null
  article: string | null
  created_at: string
  categories: Category | null
  product_variants?: ProductVariant[]
}
