import { galleryImages } from '../data/content'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Gallery() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="gallery" ref={ref} className="py-24 bg-ink-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Галерея</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Моменти наших поїздок
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((image, i) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } ${i % 5 === 0 || i % 5 === 3 ? 'row-span-2 aspect-[3/4] md:aspect-auto' : 'aspect-square'}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
