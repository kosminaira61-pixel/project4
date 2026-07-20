import { useScrollAnimation } from '../hooks/useScrollAnimation'

const advantages = [
  {
    icon: 'mountain',
    title: 'Гірські маршрути',
    text: 'Підйоми, спуски та серпантины з панорамними видами на Карпати',
  },
  {
    icon: 'shield',
    title: 'Безпека перш за все',
    text: 'Професійний інструктаж, шоломи та спорядження в комплекті',
  },
  {
    icon: 'guide',
    title: 'Досвідчені інструктори',
    text: 'Сертифіковані інструктори з багаторічним досвідом їзди по Карпатах',
  },
  {
    icon: 'camera',
    title: 'Фото та відео',
    text: 'Зберігаємо ваші враження — робимо професійні фото на маршруті',
  },
]

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    mountain: <><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    guide: <><path d="M20 7h-9M14 17H5M17.5 2.5l3 3L17 9l-4 1 1-4 3.5-3.5z" /><circle cx="6.5" cy="14.5" r="2.5" /><path d="M9.5 14.5h4l2 3" /></>,
    camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>,
  }
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" ref={ref} className="py-24 bg-ink-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Про нас</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              TRUSKAVETS.KVADRO
            </h2>
            <p className="text-white/70 text-lg mb-4 leading-relaxed">
              Преміальні квадротури мальовничими маршрутами Львівських Карпат на абсолютно нових CFMOTO CFORCE 520 L EPS (2026).
            </p>
            <p className="text-white/70 text-lg mb-4 leading-relaxed">
              Наш парк складається виключно з сучасної техніки, яка забезпечує комфорт, безпеку та впевнене проходження будь-яких маршрутів. Кожен квадроцикл оснащений:
            </p>
            <ul className="text-white/70 text-lg mb-4 leading-relaxed space-y-1 list-disc pl-6">
              <li>електропідсилювачем керма (EPS);</li>
              <li>повним приводом (4×4);</li>
              <li>блокуванням переднього диференціала;</li>
              <li>електричною лебідкою;</li>
              <li>автоматичною трансмісією;</li>
              <li>комфортним двомісним сидінням.</li>
            </ul>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Уся техніка регулярно проходить технічне обслуговування, щоб кожна поїздка була максимально безпечною, надійною та приносила лише яскраві емоції.
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-4 sm:gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {advantages.map((adv) => (
              <div
                key={adv.title}
                className="bg-ink-900 border border-white/5 rounded-2xl p-6 hover:border-accent/30 transition-colors group"
              >
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={adv.icon} />
                </div>
                <h3 className="font-semibold text-white mb-2">{adv.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{adv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
