'use client'

import { useEffect } from 'react'

interface SizeGuideModalProps {
  onClose: () => void
}

const PANTS = [
  { size: 'S',  pot: 31, pob: 62,   dbpb: 111 },
  { size: 'M',  pot: 32, pob: 64,   dbpb: 111 },
  { size: 'L',  pot: 35, pob: 66,   dbpb: 113 },
  { size: 'XL', pot: 36, pob: 68,   dbpb: 113 },
]

const JACKET = [
  { size: 'S',  pog: 67, dspt: 71, dr: 85, vv: 8 },
  { size: 'M',  pog: 70, dspt: 72, dr: 85, vv: 8 },
  { size: 'L',  pog: 72, dspt: 73, dr: 87, vv: 8 },
  { size: 'XL', pog: 73, dspt: 73, dr: 87, vv: 8 },
]

const WEIGHT = [
  { size: 'S',  g: 540 },
  { size: 'M',  g: 570 },
  { size: 'L',  g: 585 },
  { size: 'XL', g: 590 },
]

export default function SizeGuideModal({ onClose }: SizeGuideModalProps) {
  // Закрытие по Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Блокируем скролл страницы
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto" style={{ fontFamily: 'monospace' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.25em] text-black">Таблица размеров</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors text-[18px] leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-8 py-6 space-y-8">

          {/* Pants */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-black mb-1">Штаны из плащёвки</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">На резинке</p>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">Размер</th>
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">ПОТ</th>
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">ПОБ</th>
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">ДБПБ</th>
                </tr>
              </thead>
              <tbody>
                {PANTS.map(r => (
                  <tr key={r.size} className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-black">{r.size}</td>
                    <td className="py-2.5 text-black">{r.pot}</td>
                    <td className="py-2.5 text-black">{r.pob}</td>
                    <td className="py-2.5 text-black">{r.dbpb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 space-y-1 text-[10px] text-gray-400 leading-relaxed">
              <p>ПОТ — полуобхват талии</p>
              <p>ПОБ — полуобхват бёдер</p>
              <p>ДБПБ — длина брючины по боковому шву</p>
            </div>
          </div>

          {/* Jacket */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-black mb-4">Куртка из плащёвки</p>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">Размер</th>
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">ПОГ</th>
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">ДСПТ</th>
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">ДР</th>
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">ВВ</th>
                </tr>
              </thead>
              <tbody>
                {JACKET.map(r => (
                  <tr key={r.size} className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-black">{r.size}</td>
                    <td className="py-2.5 text-black">{r.pog}</td>
                    <td className="py-2.5 text-black">{r.dspt}</td>
                    <td className="py-2.5 text-black">{r.dr}</td>
                    <td className="py-2.5 text-black">{r.vv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 space-y-1 text-[10px] text-gray-400 leading-relaxed">
              <p>ПОГ — полуобхват груди</p>
              <p>ДСПТ — длина спинки от плечевой точки</p>
              <p>ДР — длина рукава</p>
              <p>ВВ — высота воротника</p>
            </div>
          </div>

          {/* Packaging */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-black mb-4">Упаковка</p>
            <p className="text-[11px] text-gray-500 mb-4">Костюм упаковывается в пакет FIZULI 40×30 см</p>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">Размер</th>
                  <th className="text-left py-2 text-gray-400 font-normal uppercase tracking-widest">Вес в упаковке</th>
                </tr>
              </thead>
              <tbody>
                {WEIGHT.map(r => (
                  <tr key={r.size} className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-black">{r.size}</td>
                    <td className="py-2.5 text-black">{r.g} г</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[10px] text-gray-400 leading-relaxed">
            Все замеры указаны в сантиметрах, если не указано иное.
          </p>
        </div>
      </div>
    </div>
  )
}
