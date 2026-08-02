const steps = [
  ['01', 'Оберіть формат', 'Перегляньте ціни, тривалість і доступні маршрути.'],
  ['02', 'Залиште заявку', 'Вкажіть телефон і бажану дату — це займає до хвилини.'],
  ['03', 'Підтвердіть поїздку', 'Ми зателефонуємо та узгодимо час старту й деталі.'],
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Як це працює</p>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Три кроки до пригоди</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <div key={number} className="relative overflow-hidden rounded-2xl border border-white/5 bg-ink-900 p-7">
              <span className="absolute right-5 top-3 font-display text-7xl font-bold text-white/[0.035]">{number}</span>
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-sm font-bold text-ink-950">{number}</span>
              <h3 className="mb-2 font-display text-2xl font-bold text-white">{title}</h3>
              <p className="leading-relaxed text-white/55">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 text-center">
          <a href="#booking" className="inline-flex rounded-xl bg-accent px-8 py-4 font-bold text-ink-950 transition-transform hover:scale-105">
            Перейти до бронювання
          </a>
        </div>
      </div>
    </section>
  )
}
