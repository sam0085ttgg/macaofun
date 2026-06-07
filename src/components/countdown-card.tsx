'use client'

import { useEffect, useState } from 'react'

interface CountdownCardProps {
  title: string
  venue: string
  date: string
  saleDate: Date
  imageColor: string
  tag: string
  comingSoonLabel: string
  ticketsOnLabel: string
}

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold tabular-nums text-cyan-300 leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] text-cyan-400/70 uppercase tracking-widest mt-1">{label}</span>
    </div>
  )
}

export default function CountdownCard({
  title,
  venue,
  date,
  saleDate,
  imageColor,
  tag,
  comingSoonLabel,
  ticketsOnLabel,
}: CountdownCardProps) {
  const { days, hours, minutes, seconds } = useCountdown(saleDate)

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col backdrop-blur-sm"
      style={{
        background: 'rgba(10,15,46,0.7)',
        border: '1px solid rgba(34,211,238,0.3)',
      }}
    >
      {/* Cover image placeholder */}
      <div
        className="h-44 w-full flex items-center justify-center text-white/25 text-sm font-medium"
        style={{ background: imageColor }}
      >
        [ Event Image ]
      </div>

      {/* Category tag + status badge */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm"
          style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.4)', color: '#22d3ee' }}
        >
          {tag}
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm"
          style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)', color: '#fbbf24' }}
        >
          {comingSoonLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-lg leading-snug" style={{ color: '#ffffff' }}>{title}</h3>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>📅 {date}</p>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>📍 {venue}</p>
        </div>

        {/* Countdown */}
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}
        >
          <p className="text-xs mb-3 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {ticketsOnLabel}
          </p>
          <div className="flex items-center justify-around">
            <TimeUnit value={days} label="天" />
            <span className="text-xl font-light mb-3" style={{ color: 'rgba(34,211,238,0.4)' }}>:</span>
            <TimeUnit value={hours} label="時" />
            <span className="text-xl font-light mb-3" style={{ color: 'rgba(34,211,238,0.4)' }}>:</span>
            <TimeUnit value={minutes} label="分" />
            <span className="text-xl font-light mb-3" style={{ color: 'rgba(34,211,238,0.4)' }}>:</span>
            <TimeUnit value={seconds} label="秒" />
          </div>
        </div>

        {/* CTA */}
        <button
          className="w-full rounded-xl py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)', color: '#0a0f2e' }}
        >
          {comingSoonLabel} →
        </button>
      </div>
    </div>
  )
}
