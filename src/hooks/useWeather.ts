import { ref } from 'vue'

export interface WeatherInfo {
  temperature: number
  humidity: number
  condition: string
  icon: string
  windDirection: string
  windSpeed: string
}

const conditions = [
  { condition: '晴', icon: '☀️' },
  { condition: '多云', icon: '⛅' },
  { condition: '阴', icon: '☁️' },
  { condition: '小雨', icon: '🌧️' },
]

const windDirections = ['东风', '南风', '西风', '北风', '东南风', '西南风']

export function useWeather() {
  const weather = ref<WeatherInfo>({
    temperature: 22,
    humidity: 65,
    condition: '多云',
    icon: '⛅',
    windDirection: '东南风',
    windSpeed: '3级',
  })

  // 模拟天气数据更新
  function generateWeather(): WeatherInfo {
    const cond = conditions[Math.floor(Math.random() * conditions.length)]
    return {
      temperature: Math.floor(Math.random() * 15 + 15), // 15-30
      humidity: Math.floor(Math.random() * 40 + 40), // 40-80
      condition: cond.condition,
      icon: cond.icon,
      windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
      windSpeed: `${Math.floor(Math.random() * 5 + 1)}级`,
    }
  }

  return { weather, generateWeather }
}
