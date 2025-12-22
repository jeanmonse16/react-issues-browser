
export function formatSmartDate(
  input: string | Date,
  locale = 'en-US'
): string {

  const date = typeof input === 'string' ? new Date(input) : input
  if (Number.isNaN(date.getTime())) return String(input)

  const now = new Date();
  const diffMs = now.getTime() - date.getTime()

  // Past relative helpers (Intl.RelativeTimeFormat expects positive for future,
  // negative for past values)
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  // Helper para comparar fechas en términos de calendario (día)
  function isSameCalendarDay(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function isYesterday(d: Date, ref: Date) {
    const yesterday = new Date(ref)
    yesterday.setDate(ref.getDate() - 1)
    return isSameCalendarDay(d, yesterday)
  }

  if (hours < 24 && isSameCalendarDay(date, now)) {
    if (hours === 0) return rtf.format(-minutes, 'minute') 
    else return rtf.format(-hours, 'hour')
  }

  if (isYesterday(date, now)) {
    const base = rtf.format(-1, 'day').toLocaleLowerCase() // normalmente "ayer"
    
    return `${base}`
    
  }

  if (days < 7) {
    // dentro de la última semana: mostrar día de la semana + hora (opcional)
    const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date)
    
    return `on ${capitalize(weekday)}`
  }

  // Más antiguo: fecha absoluta "month name + day + year"
  const absolute = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)

  return `on ${absolute}`
}

function capitalize(s: string) {
  if (!s) return s
  return s[0].toUpperCase() + s.slice(1)
}

/*
Ejemplos de uso:

formatSmartDate("2025-12-21T20:30:00.000Z", "es-ES")
formatSmartDate(new Date(), "es-ES")
formatSmartDate("2025-12-20T10:00:00.000Z", "en-US")
*/
export default formatSmartDate;