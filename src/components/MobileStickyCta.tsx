import { PHONE_TEL } from '../data/content'
import { trackEvent } from '../lib/analytics'

export default function MobileStickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-ink-950/95 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-3">
        <a
          href={`tel:${PHONE_TEL}`}
          onClick={() => trackEvent('click_to_call', { placement: 'mobile_sticky' })}
          className="flex min-h-12 flex-1 items-center justify-center rounded-xl border border-white/15 px-4 font-semibold text-white"
        >
          Подзвонити
        </a>
        <a
          href="#booking"
          onClick={() => trackEvent('cta_click', { placement: 'mobile_sticky', target: 'booking' })}
          className="flex min-h-12 flex-[1.35] items-center justify-center rounded-xl bg-accent px-4 font-bold text-ink-950"
        >
          Забронювати
        </a>
      </div>
    </div>
  )
}
