import { reviews } from '../data/content'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? '#c8ff00' : 'none'}
          stroke={i < rating ? '#c8ff00' : '#3a3a40'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="reviews" ref={ref} className="py-24 bg-ink-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Відгуки</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Що кажуть клієнти
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className={`bg-ink-900 border border-white/5 rounded-2xl p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <Stars rating={review.rating} />
              <p className="text-white/70 text-sm leading-relaxed my-4">"{review.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-white/40 text-xs">
                    {new Date(review.date).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
