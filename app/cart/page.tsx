import { supabase } from '@/lib/supabase'
import { Product } from '@/types'
import CartContent from '@/components/CartContent'

export const revalidate = 60

export default async function CartPage() {
  const { data } = await supabase
    .from('products')
    .select('*, categories(id, name, slug)')
    .order('created_at', { ascending: false })
    .limit(4)

  const recommended = (data ?? []) as Product[]

  return <CartContent recommended={recommended} />
}
