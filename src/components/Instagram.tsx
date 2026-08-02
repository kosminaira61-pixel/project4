import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/content'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Instagram() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="instagram" ref={ref} className="py-20 bg-ink-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className={`relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-ink-800 via-ink-800 to-ink-700 p-8 sm:p-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Слідкуйте за нашими пригодами
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Фото та відео з кожної поїздки, нові маршрути та акції — все це в нашому Instagram.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-ink-950 font-bold px-8 py-4 rounded-xl text-lg hover:bg-accent-dark transition-all hover:scale-105"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
