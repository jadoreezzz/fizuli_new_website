'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setVisible(current < lastScrollY.current || current < 10)
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-12 bg-white border-b border-gray-100 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Left nav */}
      <nav className="hidden md:flex items-center gap-7">
        <Link href="/catalog" className="text-[12px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors">
          Каталог
        </Link>
        <Link href="/collections" className="text-[12px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors">
          Коллекции
        </Link>
      </nav>

      {/* Mobile burger */}
      <button
        className="md:hidden text-[12px] uppercase tracking-widest"
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
        <Link href="/account" className="text-[12px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors">
          Аккаунт
        </Link>
        <Link href="/cart" className="text-[12px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors">
          Корзина
        </Link>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-12 left-0 right-0 bg-white border-b border-gray-100 px-6 py-6 flex flex-col gap-5">
          <Link href="/catalog" onClick={() => setMenuOpen(false)} className="text-[12px] uppercase tracking-widest">Каталог</Link>
          <Link href="/collections" onClick={() => setMenuOpen(false)} className="text-[12px] uppercase tracking-widest">Коллекции</Link>
          <Link href="/account" onClick={() => setMenuOpen(false)} className="text-[12px] uppercase tracking-widest">Аккаунт</Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-[12px] uppercase tracking-widest">Корзина</Link>
        </div>
      )}
    </header>
  )
}
