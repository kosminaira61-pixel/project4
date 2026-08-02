import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { PHONE, PHONE_TEL } from '../data/content'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { trackEvent } from '../lib/analytics'

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Введіть ім\'я'
    if (!form.phone.trim()) errs.phone = 'Введіть телефон'
    if (!form.message.trim()) errs.message = 'Введіть повідомлення'
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('loading')
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    }

    try {
      const [databaseResult, telegramResult] = await Promise.allSettled([
        supabase.from('contacts').insert(payload),
        fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: payload.name,
            phone: payload.phone,
            date: '-',
            time: '-',
            comment: `Контактна форма: ${payload.message}`,
          }),
        }),
      ])

      const databaseSaved = databaseResult.status === 'fulfilled' && !databaseResult.value.error
      const telegramSent = telegramResult.status === 'fulfilled' && telegramResult.value.ok
      if (!databaseSaved && !telegramSent) throw new Error('Contact could not be delivered')

      trackEvent('generate_lead', {
        event_category: 'contact',
        event_label: 'Contact Form',
        form_name: 'contact',
        value: 1,
      })

      setStatus('success')
      setErrors({})
      setForm({ name: '', phone: '', message: '' })
      setTimeout(() => setStatus('idle'), 7000)
    } catch (err) {
      console.error('Contact error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 7000)
    }
  }

  const inputClass = (field: string) =>
    `w-full bg-ink-950 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors ${
      errors[field] ? 'border-red-500' : 'border-white/10'
    }`

  return (
    <section id="contacts" ref={ref} className="py-24 bg-ink-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Контакти</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Зв'яжіться з нами
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-ink-900 border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <div>
                <p className="text-white/40 text-sm">Телефон</p>
                <a href={`tel:${PHONE_TEL}`} className="text-white font-semibold text-lg hover:text-accent transition-colors">
                  {PHONE}
                </a>
              </div>
            </div>

            <div className="bg-ink-900 border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div>
                <p className="text-white/40 text-sm">Локація</p>
                <p className="text-white font-semibold text-lg">Трускавець, парк розваг Truskavka Land</p>
              </div>
            </div>

            <div className="bg-ink-900 border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div>
                <p className="text-white/40 text-sm">Графік роботи</p>
                <p className="text-white font-semibold text-lg">Щодня 9:00 — 20:00</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/5">
              <iframe
                title="Карта — Трускавець"
                src="https://www.openstreetmap.org/export/embed.html?bbox=23.0%2C49.24%2C23.12%2C49.30&layer=mapnik&marker=49.2730%2C23.0580"
                className="w-full h-64"
                loading="lazy"
              />
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {status === 'success' && (
              <div className="mb-4 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400 text-center animate-scale-in">
                Повідомлення відправлено! Дякуємо.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-center animate-scale-in">
                Помилка відправки. Спробуйте зателефонувати.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-ink-900 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <h3 className="font-display text-2xl font-bold text-white mb-2">Форма зворотного зв'язку</h3>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Ім'я *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ваше ім'я"
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Телефон *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+380 67 660 72 56"
                  className={inputClass('phone')}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Повідомлення *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Ваше питання або повідомлення..."
                  rows={4}
                  className={inputClass('message')}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-accent text-ink-950 font-bold py-4 rounded-xl text-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Відправка...' : 'Відправити'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
