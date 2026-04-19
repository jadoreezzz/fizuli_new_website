'use client'

interface MarqueeProps {
  onDismiss: () => void
}

export default function Marquee({ onDismiss }: MarqueeProps) {
  const text = 'БЕСПЛАТНАЯ ДОСТАВКА ОТ 15 000 РУБЛЕЙ'
  const items = Array(10).fill(text)

  return (
    <div className="relative w-full bg-black flex items-center h-7 overflow-hidden">
      <div className="flex items-center whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <span key={i} className="flex items-center text-white text-[13px] uppercase tracking-widest shrink-0">
            <span className="mx-6">{item}</span>
            <span className="text-white/30 leading-none">·</span>
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="flex items-center text-white text-[13px] uppercase tracking-widest shrink-0">
            <span className="mx-6">{item}</span>
            <span className="text-white/30 leading-none">·</span>
          </span>
        ))}
      </div>
      <button
        onClick={onDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors text-[14px] leading-none z-10"
        aria-label="Закрыть"
      >
        ×
      </button>
    </div>
  )
}
