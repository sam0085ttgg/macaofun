import { useTranslations } from 'next-intl'

const FEATURES = [
  { icon: '🎯', titleKey: 'feature1Title', descKey: 'feature1Desc', accent: 'rgba(34,211,238,0.2)', border: 'rgba(34,211,238,0.3)' },
  { icon: '🔔', titleKey: 'feature2Title', descKey: 'feature2Desc', accent: 'rgba(99,102,241,0.2)', border: 'rgba(99,102,241,0.3)' },
  { icon: '✈️', titleKey: 'feature3Title', descKey: 'feature3Desc', accent: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.3)' },
]

export default function AboutPage() {
  const t = useTranslations('about')
  return (
    <div style={{ backgroundColor: '#0a0f2e', minHeight: '100vh' }}>
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px]" style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
      <div className="container relative z-10 py-16 max-w-3xl space-y-14">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#ffffff' }}>{t('title')}</h1>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('subtitle')}</p>
        </div>
        <div className="rounded-2xl p-8 space-y-3" style={{ border: '1px solid rgba(34,211,238,0.25)', backgroundColor: 'rgba(34,211,238,0.05)' }}>
          <h2 className="text-xl font-semibold" style={{ color: '#22d3ee' }}>{t('mission')}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{t('missionText')}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.titleKey} className="rounded-2xl p-6 flex flex-col gap-3" style={{ border: `1px solid ${f.border}`, backgroundColor: f.accent }}>
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-semibold text-base" style={{ color: '#ffffff' }}>{t(f.titleKey)}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{t(f.descKey)}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-10 text-center text-sm" style={{ border: '1px dashed rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.3)' }}>{t('placeholder')}</div>
      </div>
    </div>
  )
}
