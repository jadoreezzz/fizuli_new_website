import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-24">
      <div className="px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Logo */}
        <div>
          <span className="text-[12px] uppercase tracking-[0.3em] font-medium">FIZULI</span>
        </div>

        {/* Spacer on desktop */}
        <div className="hidden md:block" />

        {/* Help */}
        <div>
          <p className="text-[12px] uppercase tracking-widest text-gray-500 mb-5">Помощь</p>
          <nav className="flex flex-col gap-3">
            <Link href="/contact" className="text-[12px] text-gray-400 hover:text-white transition-colors tracking-wide">Контакты</Link>
            <Link href="/about" className="text-[12px] text-gray-400 hover:text-white transition-colors tracking-wide">О нас</Link>
            <Link href="/shipping" className="text-[12px] text-gray-400 hover:text-white transition-colors tracking-wide">Доставка и возврат</Link>
            <Link href="/terms" className="text-[12px] text-gray-400 hover:text-white transition-colors tracking-wide">Условия</Link>
          </nav>
        </div>

        {/* Info */}
        <div>
          <p className="text-[12px] uppercase tracking-widest text-gray-500 mb-5">Инфо</p>
          <nav className="flex flex-col gap-3">
            <Link href="/collections" className="text-[12px] text-gray-400 hover:text-white transition-colors tracking-wide">Коллекции</Link>
            <Link href="/catalog" className="text-[12px] text-gray-400 hover:text-white transition-colors tracking-wide">Каталог</Link>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-8 py-5 flex items-center justify-between">
        <p className="text-[12px] text-gray-600 tracking-wide">© 2026 FIZULI</p>
        <div className="flex items-center gap-5">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[12px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
            Instagram
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[12px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  )
}
