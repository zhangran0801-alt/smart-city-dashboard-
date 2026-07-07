// 交通流量数据
export interface TrafficFlowData {
  times: string[]
  values: number[]
}

// 拥堵路段
export interface CongestionItem {
  name: string
  value: number
  level: '严重' | '中度' | '轻微'
}

// 事故统计
export interface AccidentStats {
  months: string[]
  accidents: number[]
  injuries: number[]
}

// 出行方式
export interface TravelModeItem {
  name: string
  value: number
  icon: string
}

// 预警信息
export interface AlertItem {
  id: string
  time: string
  type: 'accident' | 'congestion' | 'construction' | 'weather'
  level: 'high' | 'medium' | 'low'
  message: string
  location: string
}

// 地图标注点
export interface MapMarker {
  id: string
  name: string
  x: number
  y: number
  value: number
  status: 'normal' | 'warning' | 'danger'
}

// 底部统计
export interface BottomStats {
  totalTrips: number
  onlineVehicles: number
  accidents: number
  avgSpeed: number
  congestionIndex: number
}
