'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useCart } from '@/lib/cart'
import SearchModal from '@/components/SearchModal'

interface HeaderProps {
  transparent?: boolean
}

export default function Header({ transparent = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { count } = useCart()

  const linkClass = `text-[14px] uppercase tracking-widest transition-colors ${
    transparent ? 'text-white/70 hover:text-white' : 'text-black hover:text-gray-500'
  }`

  return (
    <>
      <header className={`flex items-center justify-between px-6 h-12 border-b transition-colors duration-300 ${
        transparent ? 'bg-transparent border-transparent' : 'bg-[#fffffd] border-gray-100'
      }`}>
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-7">
          <Link href="/catalog" className={linkClass}>Каталог</Link>
          <Link href="/collections" className={linkClass}>Коллекции</Link>
        </nav>

        {/* Mobile burger */}
        <button
          className={`md:hidden text-[14px] uppercase tracking-widest ${transparent ? 'text-white/70' : 'text-black'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Закрыть' : 'Меню'}
        </button>

        {/* Logo — center */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image src="/logo.png" alt="FIZULI" width={80} height={28} className="object-contain" priority />
        </Link>

        {/* Right nav */}
        <nav className="hidden md:flex items-center gap-7">
          <button
            onClick={() => setSearchOpen(true)}
            className={`${linkClass} flex items-center`}
            aria-label="Поиск"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <circle cx="6.5" cy="6.5" r="4.5"/>
              <line x1="10.5" y1="10.5" x2="14" y2="14"/>
            </svg>
          </button>
          <Link href="/account" className={linkClass}>Аккаунт</Link>
          <Link href="/cart" className={`${linkClass} flex items-center gap-1`}>
            Корзина{count > 0 && <span>({count})</span>}
          </Link>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-12 left-0 right-0 bg-[#fffffd] border-b border-gray-100 px-6 py-6 flex flex-col gap-5">
            <button onClick={() => { setMenuOpen(false); setSearchOpen(true) }} className="text-[14px] uppercase tracking-widest text-black text-left">Поиск</button>
            <Link href="/catalog" onClick={() => setMenuOpen(false)} className="text-[14px] uppercase tracking-widest text-black">Каталог</Link>
            <Link href="/collections" onClick={() => setMenuOpen(false)} className="text-[14px] uppercase tracking-widest text-black">Коллекции</Link>
            <Link href="/account" onClick={() => setMenuOpen(false)} className="text-[14px] uppercase tracking-widest text-black">Аккаунт</Link>
            <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-[14px] uppercase tracking-widest text-black">Корзина</Link>
          </div>
        )}
      </header>

      {searchOpen && createPortal(
        <SearchModal onClose={() => setSearchOpen(false)} />,
        document.body
      )}
    </>
  )
}
