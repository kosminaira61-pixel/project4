import { PHONE, PHONE_TEL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/content'

const navLinks = [
  { href: '#about', label: 'Про нас' },
  { href: '#services', label: 'Послуги' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#routes', label: 'Маршрути' },
  { href: '#reviews', label: 'Відгуки' },
  { href: '#booking', label: 'Бронювання' },
  { href: '#contacts', label: 'Контакти' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="#hero" className="font-display text-2xl font-bold text-white">
              TRUSKAVETS<span className="text-accent">.</span>KVADRO
            </a>
            <p className="text-white/50 text-sm mt-3 max-w-xs">
              Прокат квадроциклів у Трускавці. Гірські маршрути, лісові стежки та річкові береги Карпат.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Навігація</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/50 text-sm hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Контакти</h4>
            <div className="space-y-3">
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                {PHONE}
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                {INSTAGRAM_HANDLE}
              </a>
              <p className="flex items-center gap-2 text-white/60 text-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Трускавець, парк розваг Truskavka Land
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Truskavets Kvadro. Всі права захищені.
          </p>
          <p className="text-white/30 text-sm">
            Зроблено з любов'ю до Карпат
          </p>
        </div>
      </div>
    </footer>
  )
}
