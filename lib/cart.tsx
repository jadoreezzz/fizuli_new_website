'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  image: string
  size: string
  color: string | null
}

interface CartEntry extends CartItem {
  quantity: number
}

interface CartContextValue {
  items: CartEntry[]
  count: number
  total: number
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, delta: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'fizuli_cart'

function key(productId: string, size: string) {
  return `${productId}::${size}`
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>([])

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const k = key(item.productId, item.size)
      const existing = prev.find(e => key(e.productId, e.size) === k)
      if (existing) {
        return prev.map(e =>
          key(e.productId, e.size) === k ? { ...e, quantity: e.quantity + 1 } : e
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string, size: string) => {
    setItems(prev => prev.filter(e => key(e.productId, e.size) !== key(productId, size)))
  }, [])

  const updateQuantity = useCallback((productId: string, size: string, delta: number) => {
    setItems(prev =>
      prev
        .map(e =>
          key(e.productId, e.size) === key(productId, size)
            ? { ...e, quantity: e.quantity + delta }
            : e
        )
        .filter(e => e.quantity > 0)
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const count = items.reduce((s, e) => s + e.quantity, 0)
  const total = items.reduce((s, e) => s + e.price * e.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
