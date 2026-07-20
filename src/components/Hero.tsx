import { PHONE_TEL, INSTAGRAM_URL } from '../data/content'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/2026-07-18_14.51.42.jpg"
          alt="Квадроцикл у горах"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-accent font-semibold text-sm sm:text-base tracking-widest uppercase mb-4 animate-fade-in">
          Трускавець · Карпати
        </p>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight mb-6 animate-fade-up">
          Квадроцикли<br />
          <span className="text-accent">в горах</span> Карпат
        </h1>
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          Незабутні пригоди на квадроциклах у Трускавці. Гірські перевали, лісові стежки та річкові береги чекають на вас.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="#booking"
            className="bg-accent text-ink-950 font-bold px-8 py-4 rounded-xl text-lg hover:bg-accent-dark transition-all hover:scale-105 w-full sm:w-auto"
          >
            Забронювати поїздку
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            Наш Instagram
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
