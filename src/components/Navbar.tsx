import { useEffect, useState } from 'react'
import { PHONE, PHONE_TEL } from '../data/content'
import { trackEvent } from '../lib/analytics'

const navLinks = [
  { href: '#services', label: 'Ціни' },
  { href: '#routes', label: 'Маршрути' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#reviews', label: 'Відгуки' },
  { href: '#contacts', label: 'Контакти' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-ink-950/90 py-3 backdrop-blur-md'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#hero" aria-label="Truskavets Kvadro — на початок" className="group flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-accent sm:text-2xl">
            TRUSKAVETS<span className="text-accent">.</span>KVADRO
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/70 transition-colors hover:text-accent">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => trackEvent('click_to_call', { placement: 'navbar' })}
            className="px-2 text-sm font-semibold text-white/75 transition-colors hover:text-accent"
          >
            {PHONE}
          </a>
          <a
            href="#booking"
            onClick={() => trackEvent('cta_click', { placement: 'navbar', target: 'booking' })}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-ink-950 transition-colors hover:bg-accent-dark"
          >
            Забронювати
          </a>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="mt-3 border-t border-white/5 bg-ink-900/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-2.5 font-medium text-white/80 transition-colors hover:text-accent">
                {link.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-accent px-5 py-3 text-center font-bold text-ink-950">
              Забронювати поїздку
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
