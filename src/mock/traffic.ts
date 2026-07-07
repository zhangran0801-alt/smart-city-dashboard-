import type {
  TrafficFlowData,
  CongestionItem,
  AccidentStats,
  TravelModeItem,
  AlertItem,
  MapMarker,
  BottomStats,
} from '@/types/traffic'
import { randomInt, randomFluctuation, generateId } from './utils'

/**
 * 生成交通指数数据
 */
export function generateTrafficIndex(): number {
  return randomInt(60, 85)
}

/**
 * 生成车流量趋势数据（24小时）
 */
export function generateTrafficFlow(): TrafficFlowData {
  const times: string[] = []
  const values: number[] = []

  for (let i = 0; i < 24; i++) {
    times.push(`${String(i).padStart(2, '0')}:00`)

    // 模拟早晚高峰
    let baseValue = 2000
    if (i >= 7 && i <= 9) {
      baseValue = 6000 + randomInt(-500, 500) // 早高峰
    } else if (i >= 17 && i <= 19) {
      baseValue = 7000 + randomInt(-500, 500) // 晚高峰
    } else if (i >= 10 && i <= 16) {
      baseValue = 4000 + randomInt(-300, 300) // 平峰
    } else {
      baseValue = 1500 + randomInt(-200, 200) // 低谷
    }

    values.push(baseValue)
  }

  return { times, values }
}

/**
 * 生成拥堵路段排行
 */
export function generateCongestionRank(): CongestionItem[] {
  const roads = [
    '中山北路', '汉中路', '玄武大道', '应天大街',
    '赛虹桥立交', '新模范马路', '龙蟠中路', '北京西路',
    '珠江路', '中央路', '建宁路', '河西大街',
  ]

  return roads
    .map((name) => ({
      name,
      value: randomInt(40, 100),
      level: (randomInt(0, 2) === 0 ? '严重' : randomInt(0, 1) === 0 ? '中度' : '轻微') as CongestionItem['level'],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)
}

/**
 * 生成交通事故统计（近7天）
 */
export function generateAccidentStats(): AccidentStats {
  const months: string[] = []
  const accidents: number[] = []
  const injuries: number[] = []

  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    months.push(`${date.getMonth() + 1}/${date.getDate()}`)
    accidents.push(randomInt(5, 20))
    injuries.push(randomInt(2, 10))
  }

  return { months, accidents, injuries }
}

/**
 * 生成出行方式占比
 */
export function generateTravelMode(): TravelModeItem[] {
  return [
    { name: '私家车', value: randomInt(35, 45), icon: '🚗' },
    { name: '地铁', value: randomInt(25, 35), icon: '🚇' },
    { name: '公交', value: randomInt(15, 20), icon: '🚌' },
    { name: '骑行', value: randomInt(8, 12), icon: '🚲' },
    { name: '步行', value: randomInt(5, 10), icon: '🚶' },
  ]
}

/**
 * 生成预警信息
 */
export function generateAlerts(): AlertItem[] {
  const locations = [
    '中山北路与汉中路交叉口', '玄武大道东段', '应天大街高架',
    '赛虹桥立交', '新模范马路', '龙蟠中路隧道', '北京西路',
    '珠江路地铁站', '中央路商业街', '建宁路收费站',
  ]

  const alertTypes: AlertItem['type'][] = ['accident', 'congestion', 'construction', 'weather']
  const alertLevels: AlertItem['level'][] = ['high', 'medium', 'low']

  const messages = {
    accident: ['发生交通事故，请注意绕行', '车辆故障，占用右侧车道', '轻微剐蹭，正在处理中'],
    congestion: ['严重拥堵，建议绕行', '车流量大，行驶缓慢', '临时交通管制'],
    construction: ['道路施工，请减速慢行', '管道维修，占用部分车道', '路面修复作业中'],
    weather: ['暴雨预警，路面湿滑', '大雾天气，能见度低', '强风预警，注意行车安全'],
  }

  const alerts: AlertItem[] = []
  const now = new Date()

  for (let i = 0; i < 10; i++) {
    const time = new Date(now.getTime() - randomInt(0, 3600000)) // 过去1小时内
    const type = alertTypes[randomInt(0, alertTypes.length - 1)]
    const typeMessages = messages[type]

    alerts.push({
      id: generateId(),
      time: `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`,
      type,
      level: alertLevels[randomInt(0, alertLevels.length - 1)],
      message: typeMessages[randomInt(0, typeMessages.length - 1)],
      location: locations[randomInt(0, locations.length - 1)],
    })
  }

  return alerts.sort((a, b) => b.time.localeCompare(a.time))
}

/**
 * 生成地图标注点
 */
export function generateMapMarkers(): MapMarker[] {
  const landmarks = [
    { name: '新街口', x: 50, y: 45 },
    { name: '夫子庙', x: 55, y: 55 },
    { name: '玄武湖', x: 45, y: 35 },
    { name: '中山陵', x: 70, y: 40 },
    { name: '南京站', x: 50, y: 25 },
    { name: '南京南站', x: 55, y: 75 },
    { name: '奥体中心', x: 35, y: 60 },
    { name: '仙林中心', x: 80, y: 35 },
  ]

  return landmarks.map((landmark) => ({
    id: generateId(),
    name: landmark.name,
    x: landmark.x,
    y: landmark.y,
    value: randomInt(5000, 15000),
    status: (randomInt(0, 2) === 0 ? 'normal' : randomInt(0, 1) === 0 ? 'warning' : 'danger') as MapMarker['status'],
  }))
}

/**
 * 生成底部统计数据
 */
export function generateBottomStats(): BottomStats {
  return {
    totalTrips: randomInt(1200000, 1500000),
    onlineVehicles: randomInt(80000, 120000),
    accidents: randomInt(15, 30),
    avgSpeed: randomInt(35, 55),
    congestionIndex: randomInt(60, 85),
  }
}

/**
 * 更新车流量数据（实时）
 */
export function updateTrafficFlow(prev: TrafficFlowData): TrafficFlowData {
  const newValues = [...prev.values]
  // 随机更新几个时间点的数据
  for (let i = 0; i < 3; i++) {
    const index = randomInt(0, 23)
    newValues[index] = randomFluctuation(newValues[index], 0.1)
  }
  return { ...prev, values: newValues }
}

/**
 * 更新统计数据（实时）
 */
export function updateBottomStats(prev: BottomStats): BottomStats {
  return {
    totalTrips: randomFluctuation(prev.totalTrips, 0.02),
    onlineVehicles: randomFluctuation(prev.onlineVehicles, 0.05),
    accidents: prev.accidents, // 事故数不频繁变化
    avgSpeed: randomFluctuation(prev.avgSpeed, 0.1),
    congestionIndex: randomFluctuation(prev.congestionIndex, 0.05),
  }
}
