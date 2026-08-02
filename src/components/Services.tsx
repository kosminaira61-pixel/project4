import { services } from '../data/content'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { trackEvent } from '../lib/analytics'

export default function Services() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="services" ref={ref} className="py-24 bg-ink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Послуги та ціни</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Оберіть свою пригоду
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            Вартість указана за один квадроцикл. Фінальний маршрут залежить від погоди та стану гірських доріг.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`relative bg-ink-800 border rounded-2xl p-8 transition-all duration-700 ${
                service.popular ? 'border-accent' : 'border-white/5'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {service.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-ink-950 text-xs font-bold px-4 py-1 rounded-full">
                  Популярний вибір
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-white mb-1">{service.title}</h3>
              <p className="text-white/40 text-sm mb-4">{service.duration}</p>
              <p className="font-display text-4xl font-bold text-accent mb-6">{service.price}</p>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white/70 text-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('select-booking-option', { detail: service.title }))
                  trackEvent('select_service', { service_name: service.title })
                }}
                className={`block text-center font-semibold py-3 rounded-xl transition-colors ${
                  service.popular
                    ? 'bg-accent text-ink-950 hover:bg-accent-dark'
                    : 'border border-white/10 text-white hover:bg-white/5'
                }`}
              >
                Обрати цей варіант
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
