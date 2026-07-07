/**
 * 数字千分位格式化
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 百分比格式化
 */
export function formatPercent(num: number, decimals = 1): string {
  return `${num.toFixed(decimals)}%`
}

/**
 * 大数字格式化（万、亿）
 */
export function formatLargeNumber(num: number): string {
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(2)}亿`
  }
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`
  }
  return formatNumber(num)
}

/**
 * 日期格式化
 */
export function formatDate(date: Date, format = 'YYYY-MM-DD'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

/**
 * 时间格式化（HH:mm:ss）
 */
export function formatTime(date: Date): string {
  return formatDate(date, 'HH:mm:ss')
}
