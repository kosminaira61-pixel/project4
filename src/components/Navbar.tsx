import { useEffect, useState } from 'react'
import { PHONE, PHONE_TEL, INSTAGRAM_URL } from '../data/content'

const navLinks = [
  { href: '#about', label: 'Про нас' },
  { href: '#services', label: 'Послуги' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#routes', label: 'Маршрути' },
  { href: '#reviews', label: 'Відгуки' },
  { href: '#contacts', label: 'Контакти' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = () => setOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/90 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
            TRUSKAVETS<span className="text-accent">.</span>KVADRO
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-accent transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="bg-accent text-ink-950 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-accent-dark transition-colors"
          >
            {PHONE}
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink-900/95 backdrop-blur-md border-t border-white/5 mt-3">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNav}
                className="text-white/80 hover:text-accent transition-colors py-2 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE_TEL}`}
              className="bg-accent text-ink-950 font-semibold px-5 py-3 rounded-lg text-center mt-2"
            >
              {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
