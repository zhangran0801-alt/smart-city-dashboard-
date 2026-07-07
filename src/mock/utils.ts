/**
 * 随机整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 随机浮动值
 */
export function randomFloat(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals))
}

/**
 * 基于原值的随机波动（用于实时数据更新）
 * @param value 原值
 * @param percent 波动百分比（如 0.1 表示 ±10%）
 */
export function randomFluctuation(value: number, percent = 0.1): number {
  const change = value * percent * (Math.random() * 2 - 1)
  return Math.max(0, Math.round(value + change))
}

/**
 * 生成趋势数据（波形）
 * @param count 数据点数量
 * @param min 最小值
 * @param max 最大值
 * @param pattern 波形模式
 */
export function generateTrend(
  count: number,
  min: number,
  max: number,
  pattern: 'wave' | 'random' | 'linear' = 'wave'
): number[] {
  const range = max - min

  if (pattern === 'wave') {
    // 早晚高峰波形（模拟交通流量）
    return Array.from({ length: count }, (_, i) => {
      const hour = (i / count) * 24
      // 早高峰 7-9 点，晚高峰 17-19 点
      let factor = 0.3
      if (hour >= 7 && hour <= 9) factor = 0.7 + 0.3 * Math.sin(((hour - 7) / 2) * Math.PI)
      else if (hour >= 17 && hour <= 19) factor = 0.8 + 0.2 * Math.sin(((hour - 17) / 2) * Math.PI)
      else if (hour >= 10 && hour <= 16) factor = 0.5 + 0.1 * Math.sin(((hour - 10) / 6) * Math.PI)

      return Math.round(min + range * factor + randomInt(-range * 0.05, range * 0.05))
    })
  }

  if (pattern === 'linear') {
    return Array.from({ length: count }, (_, i) => {
      return Math.round(min + (range * i) / count + randomInt(-range * 0.1, range * 0.1))
    })
  }

  // random
  return Array.from({ length: count }, () => randomInt(min, max))
}

/**
 * 从数组中随机选取 n 个元素
 */
export function sample<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
