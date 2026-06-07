'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { ALL_EVENTS } from '@/lib/events-data'
import type { EventData } from '@/lib/events-data'

// ─── Types ────────────────────────────────────────────────────────────────────
type SaleStatus = 'ended' | 'on_sale' | 'not_yet'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getSaleStatus(eventDate: string, saleDate: string): { status: SaleStatus; daysUntilSale?: number } {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const event = new Date(eventDate)
  const sale = new Date(saleDate)
  if (event < now) return { status: 'ended' }
  if (sale <= now) return { status: 'on_sale' }
  const days = Math.ceil((sale.getTime() - now.getTime()) / 86400000)
  return { status: 'not_yet', daysUntilSale: days }
}

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// ALL_EVENTS 從 src/lib/events-data.ts 引入（澳門旅遊局真實數據，共 123 個活動）

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ eventDate, saleDate }: { eventDate: string; saleDate: string }) {
  const { status, daysUntilSale } = getSaleStatus(eventDate, saleDate)

  if (status === 'ended') return (
    <span className="rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap"
      style={{ background: 'rgba(107,114,128,0.2)', color: '#9ca3af' }}>
      已結束
    </span>
  )

  if (status === 'on_sale') return (
    <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap cursor-pointer hover:opacity-80"
      style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.35)' }}>
      立即購票
    </span>
  )

  return (
    <span className="rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap"
      style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
      還有 {daysUntilSale} 天開售
    </span>
  )
}

// ─── Event List Card ──────────────────────────────────────────────────────────
function EventListCard({ event, locale }: { event: EventData; locale: string }) {
  return (
    <div className="rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-0.5"
      style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)' }}>

      <div className="h-36 overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
        {event.image ? (
          <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-90" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm"
            style={{ color: 'rgba(255,255,255,0.2)' }}>
            暫無圖片
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: event.tagBg, color: event.tagColor }}>
            {event.tag}
          </span>
          <StatusBadge eventDate={event.date} saleDate={event.saleDate} />
        </div>

        <h2 className="font-semibold leading-snug" style={{ color: '#ffffff' }}>{event.title}</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>📅 {event.dateLabel || event.date}</p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>📍 {event.venue || '澳門'}</p>

        <Link href={`/${locale}/events/${event.id}`}
          className="mt-auto text-sm font-medium hover:opacity-75 transition-opacity"
          style={{ color: '#22d3ee' }}>
          查看詳情 →
        </Link>
      </div>
    </div>
  )
}

// ─── Calendar ─────────────────────────────────────────────────────────────────
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
const POPOVER_W = 288

export default function EventsPage() {
  const locale = useLocale()
  const today = new Date()

  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())           // 0-indexed
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [popover, setPopover] = useState<{
    event: EventData
    pos: { top: number; left: number }
  } | null>(null)
  const calRef = useRef<HTMLDivElement>(null)

  // Events visible in this month
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`
  const eventsThisMonth = ALL_EVENTS.filter(e => e.date.startsWith(monthPrefix))
  const daysWithEvents = new Set(eventsThisMonth.map(e => Number(e.date.split('-')[2])))

  // Build calendar grid cells
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  function goPrev() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
    closePopover()
  }
  function goNext() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
    closePopover()
  }
  function closePopover() { setSelectedDay(null); setPopover(null) }

  function handleDayClick(day: number, e: React.MouseEvent<HTMLButtonElement>) {
    const dateStr = toDateStr(year, month, day)
    const dayEvents = ALL_EVENTS.filter(ev => ev.date === dateStr)
    if (!dayEvents.length) return
    if (selectedDay === day) { closePopover(); return }

    if (calRef.current) {
      const calRect = calRef.current.getBoundingClientRect()
      const btnRect = e.currentTarget.getBoundingClientRect()
      let left = btnRect.left - calRect.left
      if (left + POPOVER_W > calRect.width - 8) left = calRect.width - POPOVER_W - 8
      if (left < 0) left = 0
      setPopover({
        event: dayEvents[0],
        pos: { top: btnRect.bottom - calRect.top + 8, left },
      })
    }
    setSelectedDay(day)
  }

  // Close popover on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (calRef.current && !calRef.current.contains(e.target as Node)) closePopover()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Filtered event list (linked to calendar selection)
  const filteredEvents = selectedDay
    ? ALL_EVENTS.filter(e => e.date === toDateStr(year, month, selectedDay))
    : ALL_EVENTS

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  return (
    <div style={{ backgroundColor: '#0a0f2e', minHeight: '100vh' }}>
      {/* Radial glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />

      <div className="container relative z-10 py-12 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#ffffff' }}>活動日曆</h1>
          <p className="text-lg mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>探索澳門各地精彩活動</p>
        </div>

        {/* ── Calendar Card ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl p-6 relative" ref={calRef}
          style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)' }}>

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={goPrev}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-colors hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.6)' }}>‹</button>
            <span className="font-semibold text-lg" style={{ color: '#ffffff' }}>
              {year} 年 {month + 1} 月
            </span>
            <button onClick={goNext}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-colors hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.6)' }}>›</button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-xs py-2 font-medium"
                style={{ color: 'rgba(255,255,255,0.3)' }}>{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />
              const hasEvent = daysWithEvents.has(day)
              const isSelected = selectedDay === day
              const todayMark = isToday(day)
              return (
                <button key={i}
                  onClick={e => handleDayClick(day, e)}
                  disabled={!hasEvent}
                  className="flex flex-col items-center py-2 rounded-xl transition-all"
                  style={{
                    cursor: hasEvent ? 'pointer' : 'default',
                    background: isSelected ? 'rgba(34,211,238,0.15)' : 'transparent',
                    border: isSelected
                      ? '1px solid rgba(34,211,238,0.45)'
                      : todayMark
                      ? '1px solid rgba(255,255,255,0.2)'
                      : '1px solid transparent',
                  }}>
                  <span className="text-sm leading-none" style={{
                    color: isSelected ? '#22d3ee'
                      : todayMark ? '#ffffff'
                      : hasEvent ? 'rgba(255,255,255,0.85)'
                      : 'rgba(255,255,255,0.25)',
                    fontWeight: todayMark || isSelected ? 600 : 400,
                  }}>
                    {day}
                  </span>
                  {/* Event dot */}
                  <span className="mt-1 h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: hasEvent ? '#22d3ee' : 'transparent',
                      opacity: isSelected ? 1 : 0.55,
                    }} />
                </button>
              )
            })}
          </div>

          {/* Legend + clear filter */}
          <div className="mt-5 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#22d3ee' }} />
              有活動
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span className="h-4 w-4 rounded-md inline-flex items-center justify-center"
                style={{ border: '1px solid rgba(255,255,255,0.2)', fontSize: 9 }}>今</span>
              $��天
            </div>
            {selectedDay && (
              <button onClick={closePopover} className="text-xs hover:opacity-70 transition-opacity"
                style={{ color: '#22d3ee' }}>
                清除篩選 ✕
              </button>
            )}
          </div>

          {/* ── Popover ───────────────────────────────────────────────────── */}
          {popover && (
            <div className="absolute z-30 rounded-2xl shadow-2xl"
              style={{
                top: popover.pos.top,
                left: popover.pos.left,
                width: POPOVER_W,
                background: '#0d1b3e',
                border: '1px solid rgba(34,211,238,0.35)',
                backdropFilter: 'blur(16px)',
              }}>
              <div className="p-5">
                {/* Close */}
                <button onClick={closePopover}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-white/10 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>✕</button>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3 pr-7">
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: popover.event.tagBg, color: popover.event.tagColor }}>
                    {popover.event.tag}
                  </span>
                  <StatusBadge eventDate={popover.event.date} saleDate={popover.event.saleDate} />
                </div>

                {/* Title */}
                <p className="font-semibold text-sm leading-snug mb-3" style={{ color: '#ffffff' }}>
                  {popover.event.title}
                </p>

                {/* Date & Venue */}
                <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  📅 {popover.event.date} {popover.event.time}
                </p>
                <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  📍 {popover.event.venue}
                </p>

                {/* CTA */}
                <Link href={`/${locale}/events/${popover.event.id}`}
                  className="flex items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
                  style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)', color: '#0a0f2e' }}>
                  查看詳情 →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Event List (linked to calendar) ───────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold" style={{ color: '#ffffff' }}>
              {selectedDay
                ? `${year} 年 ${month + 1} 月 ${selectedDay} 日的活動`
                : '所有活動'}
            </h2>
            <span className="rounded-full px-2.5 py-0.5 text-xs"
              style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee' }}>
              {filteredEvents.length} 項
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl p-10 text-center text-sm"
              style={{ border: '1px dashed rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.3)' }}>
              該日期沒有活動
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map(event => (
                <EventListCard key={event.id} event={event} locale={locale} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
