'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Marquee from '@/components/Marquee'
import Header from '@/components/Header'

const MARQUEE_H = 28  // h-7
const HEADER_H  = 48  // h-12

export default function StickyNav() {
  const [marqueeVisible, setMarqueeVisible] = useState(true)
  const [navVisible, setNavVisible] = useState(true)
  const [inHero, setInHero] = useState(true)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  const isHome = pathname === '/'

  useEffect(() => {
    const totalNavH = HEADER_H + (marqueeVisible ? MARQUEE_H : 0)

    const checkHero = (scrollY: number) => {
      const heroBottom = window.innerHeight - totalNavH
      setInHero(scrollY < heroBottom)
    }

    if (isHome) {
      checkHero(window.scrollY)
    } else {
      setInHero(false)
    }

    const onScroll = () => {
      const current = window.scrollY
      const heroBottom = window.innerHeight - totalNavH
      const stillInHero = isHome && current < heroBottom

      // Скрываем только вне hero-зоны
      if (stillInHero) {
        setNavVisible(true)
      } else {
        setNavVisible(current < lastScrollY.current || current < 10)
      }

      lastScrollY.current = current
      if (isHome) checkHero(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome, marqueeVisible])

  const totalH = HEADER_H + (marqueeVisible ? MARQUEE_H : 0)
  const transparent = isHome && inHero

  return (
    <>
      {/* На главной спейсер не нужен — nav лежит поверх баннера */}
      {!isHome && <div style={{ height: totalH }} />}

      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {marqueeVisible && <Marquee onDismiss={() => setMarqueeVisible(false)} />}
        <Header transparent={transparent} />
      </div>
    </>
  )
}
