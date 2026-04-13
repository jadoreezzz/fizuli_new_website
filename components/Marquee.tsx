export default function Marquee() {
  const text = 'БЕСПЛАТНАЯ ДОСТАВКА ОТ 15 000 РУБЛЕЙ'
  const items = Array(10).fill(text)

  return (
    <div className="w-full bg-black overflow-hidden py-2.5">
      <div className="flex items-center whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <span key={i} className="flex items-center text-white text-[11px] uppercase tracking-widest shrink-0">
            <span className="mx-8">{item}</span>
            <span className="text-white/40 leading-none">|</span>
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="flex items-center text-white text-[11px] uppercase tracking-widest shrink-0">
            <span className="mx-8">{item}</span>
            <span className="text-white/40 leading-none">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
