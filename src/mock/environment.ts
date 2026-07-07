import type { AqiData, PmTrendData, TempHumidityItem, NoiseItem, WaterQualityItem } from '@/types/environment'
import { randomInt, randomFloat } from './utils'

/**
 * 生成空气质量指数数据
 */
export function generateAqiData(): AqiData {
  const value = randomInt(20, 180)
  let level: AqiData['level']
  let color: string

  if (value <= 50) {
    level = '优'
    color = '#52c41a'
  } else if (value <= 100) {
    level = '良'
    color = '#a0d911'
  } else if (value <= 150) {
    level = '轻度'
    color = '#faad14'
  } else if (value <= 200) {
    level = '中度'
    color = '#ff7a45'
  } else {
    level = '重度'
    color = '#ff4d4f'
  }

  return { value, level, color }
}

/**
 * 生成 PM2.5/PM10 趋势数据（24小时）
 */
export function generatePmTrend(): PmTrendData {
  const times: string[] = []
  const pm25: number[] = []
  const pm10: number[] = []

  for (let i = 0; i < 24; i++) {
    times.push(`${String(i).padStart(2, '0')}:00`)

    // 模拟早晚高峰污染较高
    let basePm25 = 35
    let basePm10 = 55

    if (i >= 7 && i <= 9) {
      basePm25 = 65 + randomInt(-10, 10)
      basePm10 = 95 + randomInt(-15, 15)
    } else if (i >= 17 && i <= 19) {
      basePm25 = 70 + randomInt(-10, 10)
      basePm10 = 100 + randomInt(-15, 15)
    } else if (i >= 10 && i <= 16) {
      basePm25 = 45 + randomInt(-8, 8)
      basePm10 = 70 + randomInt(-12, 12)
    } else {
      basePm25 = 30 + randomInt(-5, 5)
      basePm10 = 50 + randomInt(-8, 8)
    }

    pm25.push(Math.max(10, basePm25))
    pm10.push(Math.max(20, basePm10))
  }

  return { times, pm25, pm10 }
}

/**
 * 生成各区温湿度数据
 */
export function generateTempHumidity(): TempHumidityItem[] {
  const districts = ['玄武区', '秦淮区', '建邺区', '鼓楼区', '栖霞区', '江宁区']

  return districts.map((district) => ({
    district,
    temperature: randomFloat(22, 28, 1),
    humidity: randomInt(55, 75),
  }))
}

/**
 * 生成噪音监测数据
 */
export function generateNoiseData(): NoiseItem[] {
  const locations = [
    { name: '新街口商圈', x: 20, y: 30 },
    { name: '夫子庙景区', x: 65, y: 45 },
    { name: '南京站', x: 45, y: 15 },
    { name: '奥体中心', x: 30, y: 70 },
    { name: '仙林大学城', x: 80, y: 25 },
    { name: '江宁开发区', x: 70, y: 80 },
    { name: '河西CBD', x: 25, y: 55 },
    { name: '大行宫', x: 50, y: 40 },
  ]

  return locations.map((loc) => {
    const value = randomInt(40, 85)
    let level: NoiseItem['level']

    if (value < 55) {
      level = 'quiet'
    } else if (value < 70) {
      level = 'normal'
    } else {
      level = 'noisy'
    }

    return {
      id: loc.name,
      location: loc.name,
      x: loc.x,
      y: loc.y,
      value,
      level,
    }
  })
}

/**
 * 生成水质监测数据
 */
export function generateWaterQuality(): WaterQualityItem[] {
  const waterBodies = [
    { name: '玄武湖', ph: randomFloat(6.8, 7.5, 1), level: 'II' as const },
    { name: '秦淮河', ph: randomFloat(6.5, 7.8, 1), level: 'III' as const },
    { name: '长江南京段', ph: randomFloat(7.0, 7.6, 1), level: 'II' as const },
    { name: '莫愁湖', ph: randomFloat(6.9, 7.4, 1), level: 'II' as const },
    { name: '紫金山水库', ph: randomFloat(7.1, 7.7, 1), level: 'I' as const },
  ]

  return waterBodies.map((item) => ({
    name: item.name,
    ph: item.ph,
    dissolvedOxygen: randomFloat(5.5, 8.5, 1),
    turbidity: randomFloat(1.0, 5.0, 1),
    level: item.level,
  }))
}
