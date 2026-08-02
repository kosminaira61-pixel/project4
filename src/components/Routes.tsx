import { routes } from '../data/content'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { trackEvent } from '../lib/analytics'

const difficultyColors: Record<string, string> = {
  'Легка': 'bg-green-500/15 text-green-400 border-green-500/30',
  'Середня': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  'Складна': 'bg-red-500/15 text-red-400 border-red-500/30',
}

export default function Routes() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="routes" ref={ref} className="py-24 bg-ink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Маршрути</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Оберіть маршрут
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            Обирайте панорами, лісові дороги або складніший гірський маршрут. Перед стартом інструктор узгодить безпечний формат поїздки.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {routes.map((route, i) => (
            <div
              key={route.id}
              className={`bg-ink-800 border border-white/5 rounded-2xl overflow-hidden transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.title}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full border ${difficultyColors[route.difficulty]}`}>
                  {route.difficulty}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-white mb-3">{route.title}</h3>
                <div className="flex items-center gap-4 text-sm text-white/40 mb-4">
                  <span className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    {route.duration}
                  </span>
                  {route.distance && (
                    <span className="flex items-center gap-1.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {route.distance}
                    </span>
                  )}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{route.description}</p>
                <a
                  href="#booking"
                  onClick={() => {
                  window.dispatchEvent(new CustomEvent('select-booking-option', { detail: route.title }))
                  trackEvent('select_route', { route_name: route.title })
                }}
                  className="block text-center font-semibold py-3 rounded-xl border border-accent/40 text-white hover:bg-accent hover:text-ink-950 transition-colors"
                >
                  Обрати маршрут
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
