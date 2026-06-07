import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import CountdownCard from '@/components/countdown-card'

const UPCOMING_EVENTS = [
  {
    id: '1',
    titleKey: '五月天 LIVE IN MACAO 2026',
    date: '2026-07-20',
    venue: '澳門威尼斯人金光綜藝館',
    saleDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000),
    imageColor: 'linear-gradient(135deg, #1a1a4e 0%, #2d1b69 50%, #11998e 100%)',
    tag: '演唱會',
  },
  {
    id: '2',
    titleKey: '澳門藝術節 × 當代視覺展',
    date: '2026-08-05',
    venue: '澳門文化中心',
    saleDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000),
    imageColor: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    tag: '展覽',
  },
]

export default function HomePage() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <div>
      <section className="relative flex flex-col items-center justify-center min-h-[88vh] px-6 text-center overflow-hidden" style={{ backgroundColor: '#0a0f2e' }}>
        <div className="pointer-events-none absolute" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0.06) 40%, transparent 70%)' }} />
        <div className="pointer-events-none absolute" style={{ bottom: '-5%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 65%)' }} />
        <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-300 mb-6 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          即時開售倒計時
        </div>
        <h1 className="relative z-10 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl leading-tight mb-5" style={{ color: '#ffffff' }}>
          {t('title').split(' ').map((word, i) => (
            <span key={i}>{i === 1 ? <span style={{ color: '#22d3ee' }}>{word}</span> : word}{i < t('title').split(' ').length - 1 ? ' ' : ''}</span>
          ))}
        </h1>
        <p className="relative z-10 text-lg md:text-xl max-w-xl leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('subtitle')}</p>
        <Link href={`/${locale}/events`} className="relative z-10 inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)', color: '#0a0f2e' }}>{t('cta')} →</Link>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent, #0a0f2e)' }} />
      </section>
      <section className="py-16 px-6" style={{ backgroundColor: '#0a0f2e' }}>
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px flex-1 bg-white/10" />
            <h2 className="text-white/80 text-sm font-medium uppercase tracking-widest">{t('comingSoon')}</h2>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {UPCOMING_EVENTS.map((event) => (
              <CountdownCard key={event.id} title={event.titleKey} date={event.date} venue={event.venue} saleDate={event.saleDate} imageColor={event.imageColor} tag={event.tag} comingSoonLabel={t('comingSoon')} ticketsOnLabel={t('ticketsOn')} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
