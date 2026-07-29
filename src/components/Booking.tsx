import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { routes, services } from '../data/content'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

type FormState = {
  name: string
  phone: string
  booking_date: string
  people_count: number
  route: string
  comment: string
}

const initialState: FormState = {
  name: '',
  phone: '',
  booking_date: '',
  people_count: 1,
  route: '',
  comment: '',
}

export default function Booking() {
  const { ref, isVisible } = useScrollAnimation()
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) e.name = 'Введіть ім\'я'
    if (!form.phone.trim()) e.phone = 'Введіть телефон'
    else if (!/^[+]?[\d\s()-]{7,}$/.test(form.phone)) e.phone = 'Невірний формат телефону'
    if (!form.booking_date) e.booking_date = 'Оберіть дату'
    return e
  }

  const handleChange = (field: keyof FormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const validationErrors = validate()

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }

  setStatus('loading')

  try {
    // 1. Зберігаємо бронювання в Supabase
    const { error } = await supabase.from('bookings').insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      booking_date: form.booking_date,
      people_count: form.people_count,
      route: form.route || null,
      comment: form.comment.trim() || null,
    })

    if (error) throw error

    // 2. Відправляємо generate_lead у Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'generate_lead', {
        event_category: 'booking',
        event_label: 'Booking Form',
        value: 1,
        debug_mode: true,
      })

      console.log('GA4 generate_lead sent')
    } else {
      console.error('GA4 gtag not found')
    }

    // 3. Відправляємо заявку у Telegram
    try {
      const telegramResponse = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          date: form.booking_date,
          time: '-',
          comment: `Маршрут: ${form.route || 'Не вказано'}
Кількість людей: ${form.people_count}
${form.comment.trim() || ''}`,
        }),
      })

      if (!telegramResponse.ok) {
        console.error(
          'Telegram request failed:',
          telegramResponse.status
        )
      }
    } catch (telegramError) {
      console.error('Telegram error:', telegramError)
    }

    // 4. Показуємо успішне бронювання
    setStatus('success')
    setForm(initialState)

    setTimeout(() => {
      setStatus('idle')
    }, 5000)
  } catch (err) {
    console.error('Booking error:', err)

    setStatus('error')

    setTimeout(() => {
      setStatus('idle')
    }, 5000)
  }
}

  const inputClass = (field: keyof FormState) =>
    `w-full bg-ink-950 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors ${
      errors[field] ? 'border-red-500' : 'border-white/10'
    }`

  return (
    <section id="booking" ref={ref} className="py-24 bg-ink-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Бронювання</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Забронювати поїздку
          </h2>
          <p className="text-white/60 text-lg mt-4">
            Заповніть форму, і ми зв'яжемося з вами для підтвердження.
          </p>
        </div>

        {status === 'success' && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400 text-center animate-scale-in">
            Дякуємо! Ваша заявка прийнята. Ми зв'яжемося з вами найближчим часом.
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-center animate-scale-in">
            Сталася помилка. Спробуйте ще раз або зателефонуйте нам.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`bg-ink-800 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-5 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Ім'я *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
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
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+380 67 660 72 56"
                className={inputClass('phone')}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Дата поїздки *</label>
              <input
                type="date"
                value={form.booking_date}
                onChange={(e) => handleChange('booking_date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={inputClass('booking_date')}
              />
              {errors.booking_date && <p className="text-red-400 text-xs mt-1">{errors.booking_date}</p>}
            </div>
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Кількість людей</label>
              <input
                type="number"
                value={form.people_count}
                onChange={(e) => handleChange('people_count', Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                max={10}
                className={inputClass('people_count')}
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Маршрут</label>
            <select
              value={form.route}
              onChange={(e) => handleChange('route', e.target.value)}
              className={inputClass('route')}
            >
              <option value="">Не обрано</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
              {routes.map((r) => (
                <option key={r.id} value={r.title}>{r.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Коментар</label>
            <textarea
              value={form.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
              placeholder="Додаткові побажання або питання..."
              rows={3}
              className={inputClass('comment')}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-accent text-ink-950 font-bold py-4 rounded-xl text-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Відправка...' : 'Відправити заявку'}
          </button>
        </form>
      </div>
    </section>
  )
  
  
}
