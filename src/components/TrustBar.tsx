const items = [
  ['CFMOTO 2026', 'Сучасні двомісні квадроцикли'],
  ['Безпечний старт', 'Інструктаж і шоломи включені'],
  ['Супровід', 'Маршрут проходить з інструктором'],
  ['Щодня', 'Працюємо з 9:00 до 20:00'],
]

export default function TrustBar() {
  return (
    <section aria-label="Переваги" className="relative z-20 -mt-8 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-2xl backdrop-blur lg:grid-cols-4">
          {items.map(([title, text], index) => (
            <div
              key={title}
              className={`p-4 sm:p-5 ${index < 2 ? 'border-b lg:border-b-0' : ''} ${index % 2 === 0 ? 'border-r' : ''} border-white/5 lg:border-r lg:last:border-r-0`}
            >
              <p className="font-semibold text-white">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50 sm:text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
