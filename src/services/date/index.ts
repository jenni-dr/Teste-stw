import { startOfMonth, endOfMonth, format, parseISO } from 'date-fns'

export function firstDayOfCurrentMonth(): Date {
  return startOfMonth(new Date())
}

export function lastDayOfCurrentMonth(): Date {
  return endOfMonth(new Date())
}

export function convertIsoDateToPtBr(
  date: string | undefined | null,
  time = false
): string {
  if (!date) return ''

  return format(parseISO(date), time ? `dd/MM/yyyy 'às' HH:mm` : 'dd/MM/yyyy')
}

export function convertIsoDateToTime(date: string | undefined | null): string {
  if (!date) return ''

  return format(parseISO(date), 'HH:mm')
}

export function convertDateToString(date: Date | undefined | null): string {
  if (!date) return ''

  return format(date, 'yyyy-MM-dd')
}
