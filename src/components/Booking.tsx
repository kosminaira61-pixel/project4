import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { routes, services, PHONE, PHONE_TEL } from '../data/content'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { trackEvent } from '../lib/analytics'

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
  const minDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  useEffect(() => {
    const selectOption = (event: Event) => {
      const selected = (event as CustomEvent<string>).detail
      if (selected) setForm((previous) => ({ ...previous, route: selected }))
    }

    window.addEventListener('select-booking-option', selectOption)
    return () => window.removeEventListener('select-booking-option', selectOption)
  }, [])

  const validate = () => {
    const validationErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) validationErrors.name = 'Введіть ім\'я'
    if (!form.phone.trim()) validationErrors.phone = 'Введіть телефон'
    else if (!/^[+]?[\d\s()-]{7,}$/.test(form.phone)) validationErrors.phone = 'Невірний формат телефону'
    if (!form.booking_date) validationErrors.booking_date = 'Оберіть дату'
    return validationErrors
  }

  const handleChange = (field: keyof FormState, value: string | number) => {
    setForm((previous) => ({ ...previous, [field]: value }))
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      booking_date: form.booking_date,
      people_count: form.people_count,
      route: form.route || null,
      comment: form.comment.trim() || null,
    }

    try {
      const [databaseResult, telegramResult] = await Promise.allSettled([
        supabase.from('bookings').insert(payload),
        fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: payload.name,
            phone: payload.phone,
            date: payload.booking_date,
            time: '-',
            comment: `Маршрут: ${payload.route || 'Не вказано'}\nКількість людей: ${payload.people_count}\n${payload.comment || ''}`,
          }),
        }),
      ])

      const databaseSaved = databaseResult.status === 'fulfilled' && !databaseResult.value.error
      const telegramSent = telegramResult.status === 'fulfilled' && telegramResult.value.ok

      if (!databaseSaved) {
        console.error(
          'Booking database error:',
          databaseResult.status === 'fulfilled' ? databaseResult.value.error : databaseResult.reason,
        )
      }
      if (!telegramSent) {
        console.error(
          'Booking Telegram error:',
          telegramResult.status === 'fulfilled' ? telegramResult.value.status : telegramResult.reason,
        )
      }
      if (!databaseSaved && !telegramSent) throw new Error('Booking could not be delivered')

      trackEvent('generate_lead', {
        event_category: 'booking',
        event_label: 'Booking Form',
        form_name: 'booking',
        selected_option: payload.route || 'not_selected',
        value: 1,
      })

      setStatus('success')
      setErrors({})
      setForm(initialState)
      window.setTimeout(() => setStatus('idle'), 7000)
    } catch (error) {
      console.error('Booking error:', error)
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 7000)
    }
  }

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-xl border bg-ink-950 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-accent focus:outline-none ${
      errors[field] ? 'border-red-500' : 'border-white/10'
    }`

  return (
    <section id="booking" ref={ref} className="bg-ink-900 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className={`mb-10 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Бронювання</p>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Залиште заявку</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Вкажіть контактні дані та бажану дату. Ми зателефонуємо, щоб підтвердити час і маршрут.
          </p>
        </div>

        {status === 'success' && (
          <div role="status" className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-5 text-center text-green-400 animate-scale-in">
            <p className="font-semibold">Заявку прийнято!</p>
            <p className="mt-1 text-sm text-green-300/80">Ми зв'яжемося з вами для підтвердження поїздки.</p>
          </div>
        )}
        {status === 'error' && (
          <div role="alert" className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-center text-red-400 animate-scale-in">
            Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте: <a href={`tel:${PHONE_TEL}`} className="font-bold underline">{PHONE}</a>.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`rounded-3xl border border-white/5 bg-ink-800 p-6 shadow-2xl transition-all duration-700 sm:p-9 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="mb-6 flex flex-wrap gap-2 text-xs text-white/55 sm:text-sm">
            <span className="rounded-full border border-white/10 px-3 py-1.5">Інструктаж включено</span>
            <span className="rounded-full border border-white/10 px-3 py-1.5">Шоломи включено</span>
            <span className="rounded-full border border-white/10 px-3 py-1.5">Підтвердження телефоном</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="booking-name" className="mb-2 block text-sm font-medium text-white/70">Ім'я *</label>
              <input id="booking-name" type="text" autoComplete="name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Ваше ім'я" className={inputClass('name')} />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="booking-phone" className="mb-2 block text-sm font-medium text-white/70">Телефон *</label>
              <input id="booking-phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+380 67 660 72 56" className={inputClass('phone')} />
              {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="booking-date" className="mb-2 block text-sm font-medium text-white/70">Дата поїздки *</label>
              <input id="booking-date" type="date" value={form.booking_date} onChange={(e) => handleChange('booking_date', e.target.value)} min={minDate} className={inputClass('booking_date')} />
              {errors.booking_date && <p className="mt-1 text-xs text-red-400">{errors.booking_date}</p>}
            </div>
            <div>
              <label htmlFor="booking-people" className="mb-2 block text-sm font-medium text-white/70">Кількість людей</label>
              <input id="booking-people" type="number" value={form.people_count} onChange={(e) => handleChange('people_count', Math.max(1, Number.parseInt(e.target.value, 10) || 1))} min={1} max={10} className={inputClass('people_count')} />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="booking-route" className="mb-2 block text-sm font-medium text-white/70">Формат або маршрут</label>
            <select id="booking-route" value={form.route} onChange={(e) => handleChange('route', e.target.value)} className={inputClass('route')}>
              <option value="">Допоможіть обрати</option>
              <optgroup label="Формати поїздки">
                {services.map((service) => <option key={service.id} value={service.title}>{service.title} — {service.duration}</option>)}
              </optgroup>
              <optgroup label="Маршрути">
                {routes.map((route) => <option key={route.id} value={route.title}>{route.title}</option>)}
              </optgroup>
            </select>
          </div>

          <div className="mt-5">
            <label htmlFor="booking-comment" className="mb-2 block text-sm font-medium text-white/70">Коментар</label>
            <textarea id="booking-comment" value={form.comment} onChange={(e) => handleChange('comment', e.target.value)} placeholder="Наприклад: їдемо вперше, потрібні два квадроцикли" rows={3} className={inputClass('comment')} />
          </div>

          <button type="submit" disabled={status === 'loading'} className="mt-6 w-full rounded-xl bg-accent py-4 text-lg font-bold text-ink-950 transition-all hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50">
            {status === 'loading' ? 'Надсилаємо заявку...' : 'Надіслати заявку'}
          </button>
          <p className="mt-3 text-center text-xs leading-relaxed text-white/35">Надсилання форми не є оплатою. Остаточні деталі узгоджуються телефоном.</p>
        </form>
      </div>
    </section>
  )
}
