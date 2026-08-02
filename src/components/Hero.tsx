import { PHONE_TEL, services } from '../data/content'
import { trackEvent } from '../lib/analytics'

export default function Hero() {
  const startingPrice = services[0]?.price ?? '2 000 ₴'

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden pb-20 pt-28">
      <div className="absolute inset-0 z-0">
        <img
          src="/2026-07-18_14.51.42.jpg"
          alt="Прокат квадроциклів у горах біля Трускавця"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-ink-950/55 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Трускавець · Карпати
        </div>
        <h1 className="mb-6 font-display text-5xl font-bold leading-[0.98] text-white sm:text-7xl md:text-8xl">
          Квадроцикли<br />
          <span className="text-accent">в горах</span> Карпат
        </h1>
        <p className="mx-auto mb-5 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
          Гірські маршрути з інструктором на нових двомісних CFMOTO. Підійде навіть для першої поїздки.
        </p>

        <div className="mx-auto mb-8 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-sm font-semibold text-white sm:text-base">
          <span className="rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur">від {startingPrice}</span>
          <span className="rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur">від 1 години</span>
          <span className="rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur">до 2 осіб на квадроциклі</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#booking"
            onClick={() => trackEvent('cta_click', { placement: 'hero', target: 'booking' })}
            className="w-full rounded-xl bg-accent px-8 py-4 text-lg font-bold text-ink-950 transition-all hover:scale-105 hover:bg-accent-dark sm:w-auto"
          >
            Забронювати поїздку
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => trackEvent('click_to_call', { placement: 'hero' })}
            className="w-full rounded-xl border border-white/25 bg-black/20 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition-all hover:bg-white/10 sm:w-auto"
          >
            Зателефонувати
          </a>
        </div>

        <a href="#routes" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-accent">
          Переглянути маршрути
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
        </a>
      </div>
    </section>
  )
}
