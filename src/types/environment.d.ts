// 空气质量
export interface AqiData {
  value: number
  level: '优' | '良' | '轻度' | '中度' | '重度'
  color: string
}

// PM 趋势
export interface PmTrendData {
  times: string[]
  pm25: number[]
  pm10: number[]
}

// 温湿度
export interface TempHumidityItem {
  district: string
  temperature: number
  humidity: number
}

// 噪音监测
export interface NoiseItem {
  id: string
  location: string
  x: number
  y: number
  value: number
  level: 'quiet' | 'normal' | 'noisy'
}

// 水质监测
export interface WaterQualityItem {
  name: string
  ph: number
  dissolvedOxygen: number
  turbidity: number
  level: 'I' | 'II' | 'III' | 'IV' | 'V'
}
