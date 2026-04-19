import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#fffffd]">
      <div className="px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Logo + Contacts */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-4">Контакты</p>
            <div className="flex flex-col gap-2">
              <a href="tel:+79936264234" className="text-[14px] text-gray-900 hover:text-black transition-colors">
                +7 (993) 626-42-34
              </a>
              <a href="mailto:fizuliwear@mail.ru" className="text-[14px] text-gray-900 hover:text-black transition-colors">
                fizuliwear@mail.ru
              </a>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Москва, ТЦ Мозайка<br />7-я Кожуховская, 9
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block" />

          {/* Помощь */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-4">Помощь</p>
            <nav className="flex flex-col gap-2.5">
              <Link href="/contact" className="text-[14px] text-gray-900 hover:text-black transition-colors">Контакты</Link>
              <Link href="/about" className="text-[14px] text-gray-900 hover:text-black transition-colors">О нас</Link>
              <Link href="/shipping" className="text-[14px] text-gray-900 hover:text-black transition-colors">Доставка и возврат</Link>
              <Link href="/terms" className="text-[14px] text-gray-900 hover:text-black transition-colors">Условия</Link>
            </nav>
          </div>

          {/* Каталог */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-4">Каталог</p>
            <nav className="flex flex-col gap-2.5">
              <Link href="/collections" className="text-[14px] text-gray-900 hover:text-black transition-colors">Коллекции</Link>
              <Link href="/catalog" className="text-[14px] text-gray-900 hover:text-black transition-colors">Все товары</Link>
            </nav>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p className="text-[11px] text-gray-500 tracking-wide">© 2026 FIZULI</p>
        <p className="text-[11px] text-gray-500 leading-relaxed text-right">
          ИП Васильичев Павел Олегович&nbsp;&nbsp;·&nbsp;&nbsp;ИНН 370228045114&nbsp;&nbsp;·&nbsp;&nbsp;ОГРНИП 321370200033167
        </p>
      </div>
    </footer>
  )
}
