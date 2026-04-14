'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/lib/cart'

interface HeaderProps {
  transparent?: boolean
}

export default function Header({ transparent = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()

  const linkClass = `text-[12px] uppercase tracking-widest transition-colors ${
    transparent ? 'text-white/70 hover:text-white' : 'text-black hover:text-gray-500'
  }`

  return (
    <header className={`flex items-center justify-between px-6 h-12 border-b transition-colors duration-300 ${
      transparent ? 'bg-transparent border-transparent' : 'bg-white border-gray-100'
    }`}>
      {/* Left nav */}
      <nav className="hidden md:flex items-center gap-7">
        <Link href="/catalog" className={linkClass}>Каталог</Link>
        <Link href="/collections" className={linkClass}>Коллекции</Link>
      </nav>

      {/* Mobile burger */}
      <button
        className={`md:hidden text-[12px] uppercase tracking-widest ${transparent ? 'text-white/70' : 'text-black'}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? 'Закрыть' : 'Меню'}
      </button>

      {/* Logo — center */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/logo.png"
          alt="FIZULI"
          width={80}
          height={28}
          className="object-contain"
          priority
        />
      </Link>

      {/* Right nav */}
      <nav className="hidden md:flex items-center gap-7">
        <Link href="/account" className={linkClass}>Аккаунт</Link>
        <Link href="/cart" className={`${linkClass} flex items-center gap-1`}>
          Корзина{count > 0 && <span>({count})</span>}
        </Link>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-12 left-0 right-0 bg-white border-b border-gray-100 px-6 py-6 flex flex-col gap-5">
          <Link href="/catalog" onClick={() => setMenuOpen(false)} className="text-[12px] uppercase tracking-widest text-black">Каталог</Link>
          <Link href="/collections" onClick={() => setMenuOpen(false)} className="text-[12px] uppercase tracking-widest text-black">Коллекции</Link>
          <Link href="/account" onClick={() => setMenuOpen(false)} className="text-[12px] uppercase tracking-widest text-black">Аккаунт</Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-[12px] uppercase tracking-widest text-black">Корзина</Link>
        </div>
      )}
    </header>
  )
}
