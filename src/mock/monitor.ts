import { randomInt } from './utils'

// 视频监控数据
export interface VideoFeed {
  id: string
  name: string
  location: string
  status: 'online' | 'offline'
  thumbnail: string
}

// 设备状态数据
export interface DeviceStatus {
  category: string
  total: number
  online: number
  offline: number
  warning: number
}

// 告警列表
export interface AlertItem {
  id: string
  time: string
  level: 'high' | 'medium' | 'low'
  type: string
  device: string
  location: string
  message: string
  status: 'pending' | 'processing' | 'resolved'
}

/**
 * 生成视频监控数据
 */
export function generateVideoFeeds(): VideoFeed[] {
  const locations = [
    { name: '新街口广场', location: '秦淮区中山路' },
    { name: '夫子庙景区', location: '秦淮区贡院街' },
    { name: '南京站出口', location: '玄武区龙蟠路' },
    { name: '奥体中心', location: '建邺区江东中路' },
    { name: '玄武湖公园', location: '玄武区玄武巷' },
    { name: '中山陵景区', location: '玄武区石象路' },
  ]

  return locations.map((loc, index) => ({
    id: `cam-${index + 1}`,
    name: loc.name,
    location: loc.location,
    status: Math.random() > 0.15 ? 'online' : 'offline',
    thumbnail: `https://via.placeholder.com/320x180/1a2332/00d4ff?text=${encodeURIComponent(loc.name)}`,
  }))
}

/**
 * 生成设备状态数据
 */
export function generateDeviceStatus(): DeviceStatus[] {
  return [
    {
      category: '摄像头',
      total: randomInt(1200, 1300),
      online: randomInt(1100, 1200),
      offline: randomInt(50, 80),
      warning: randomInt(20, 40),
    },
    {
      category: '交通信号灯',
      total: randomInt(3800, 4000),
      online: randomInt(3700, 3800),
      offline: randomInt(30, 50),
      warning: randomInt(15, 30),
    },
    {
      category: '环境监测站',
      total: randomInt(180, 200),
      online: randomInt(170, 180),
      offline: randomInt(5, 10),
      warning: randomInt(3, 8),
    },
    {
      category: '智慧路灯',
      total: randomInt(25000, 27000),
      online: randomInt(24500, 26000),
      offline: randomInt(200, 300),
      warning: randomInt(100, 200),
    },
    {
      category: '公共WiFi',
      total: randomInt(5000, 5500),
      online: randomInt(4800, 5200),
      offline: randomInt(100, 200),
      warning: randomInt(50, 100),
    },
  ]
}

/**
 * 生成告警列表
 */
export function generateAlertList(): AlertItem[] {
  const alertTypes = ['设备故障', '网络异常', '电力告警', '温度告警', '安全告警']
  const devices = ['摄像头-A001', '信号灯-B023', '监测站-C015', '路灯-D1024', 'WiFi-E567']
  const locations = ['新街口', '夫子庙', '南京站', '奥体中心', '玄武湖', '中山陵']
  const messages = [
    '设备离线超过5分钟',
    '网络连接不稳定',
    '供电电压异常',
    '设备温度超过阈值',
    '检测到异常访问',
  ]

  const alerts: AlertItem[] = []
  const now = new Date()

  for (let i = 0; i < 20; i++) {
    const time = new Date(now.getTime() - i * randomInt(300000, 1800000)) // 随机时间间隔
    const level = Math.random() < 0.3 ? 'high' : Math.random() < 0.6 ? 'medium' : 'low'
    const status = Math.random() < 0.4 ? 'pending' : Math.random() < 0.7 ? 'processing' : 'resolved'

    alerts.push({
      id: `alert-${Date.now()}-${i}`,
      time: `${time.getMonth() + 1}/${time.getDate()} ${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`,
      level,
      type: alertTypes[randomInt(0, alertTypes.length - 1)],
      device: devices[randomInt(0, devices.length - 1)],
      location: locations[randomInt(0, locations.length - 1)],
      message: messages[randomInt(0, messages.length - 1)],
      status,
    })
  }

  return alerts
}
