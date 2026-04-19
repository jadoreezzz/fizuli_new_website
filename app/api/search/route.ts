import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()

  if (!q) {
    // Featured: latest 8 products
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, price, images, article')
      .order('created_at', { ascending: false })
      .limit(8)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data ?? [])
  }

  // Search by name or article
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, price, images, article, product_variants(id, size, stock)')
    .or(`name.ilike.%${q}%,article.ilike.%${q}%`)
    .limit(8)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}
