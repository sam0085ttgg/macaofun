import Link from 'next/link'
import { ALL_EVENTS } from '@/lib/events-data'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  const params = []
  for (const locale of routing.locales) {
    for (const event of ALL_EVENTS) {
      params.push({ locale, id: event.id })
    }
  }
  return params
}

export default function EventDetailPage({ params }: { params: { id: string; locale: string } }) {
  const locale = params.locale
  const event = ALL_EVENTS.find(e => e.id === params.id)

  if (!event) {
    return (
      <div style={{ backgroundColor: '#0a0f2e', minHeight: '100vh' }}>
        <div className="container relative z-10 py-12 max-w-3xl">
          <Link href={`/${locale}/events`} className="inline-flex items-center text-sm hover:opacity-70" style={{ color: 'rgba(255,255,255,0.5)' }}>← 返回活動列表</Link>
          <p className="mt-12 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>找不到此活動</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#0a0f2e', minHeight: '100vh' }}>
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px]" style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />
      <div className="container relative z-10 py-12 max-w-3xl space-y-8">
        <Link href={`/${locale}/events`} className="inline-flex items-center text-sm transition-opacity hover:opacity-70" style={{ color: 'rgba(255,255,255,0.5)' }}>← 返回活動列表</Link>
        <div className="h-64 w-full rounded-2xl overflow-hidden relative" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          {event.image ? (
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'rgba(255,255,255,0.2)' }}>暫無圖片</div>
          )}
        </div>
        <div className="space-y-6">
          <span className="inline-block rounded-full px-3 py-1 text-sm font-medium" style={{ backgroundColor: event.tagBg, color: event.tagColor }}>{event.tag}</span>
          <h1 className="text-3xl font-bold tracking-tight leading-tight" style={{ color: '#ffffff' }}>{event.title}</h1>
          <div className="grid grid-cols-2 gap-6 rounded-2xl p-6" style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)' }}>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>日期</p>
              <p className="font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{event.dateLabel || event.date}{event.endDate && event.endDate !== event.date ? ` — ${event.endDate}` : ''}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>地點</p>
              <p className="font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{event.venue || '澳門'}</p>
            </div>
          </div>
          {event.desc ? (
            <div className="rounded-2xl p-6 text-sm leading-relaxed whitespace-pre-line" style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)' }}>{event.desc}</div>
          ) : (
            <div className="rounded-2xl p-10 text-center text-sm" style={{ border: '1px dashed rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.3)' }}>詳情請查閱澳門旅遊局官網</div>
          )}
          <a href="https://www.macaotourism.gov.mo/zh-hant/whatson" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:opacity-75 transition-opacity" style={{ color: '#22d3ee' }}>查看澳門旅遊局官網 →</a>
        </div>
      </div>
    </div>
  )
}
