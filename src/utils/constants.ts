// 主题颜色
export const COLORS = {
  primary: '#00d4ff',
  success: '#00ff88',
  warning: '#ffaa00',
  danger: '#ff4466',
  purple: '#aa66ff',
  cyan: '#66ffcc',
}

// 南京区域列表
export const NANJING_DISTRICTS = [
  '玄武区',
  '秦淮区',
  '建邺区',
  '鼓楼区',
  '浦口区',
  '栖霞区',
  '雨花台区',
  '江宁区',
  '六合区',
  '溧水区',
  '高淳区',
]

// 南京主要地标/区域（用于地图标注）
export const NANJING_LANDMARKS = [
  { name: '新街口', x: 48, y: 45 },
  { name: '夫子庙', x: 52, y: 52 },
  { name: '玄武湖', x: 50, y: 38 },
  { name: '中山陵', x: 58, y: 42 },
  { name: '河西', x: 42, y: 50 },
  { name: '仙林', x: 65, y: 40 },
  { name: '江宁', x: 50, y: 70 },
  { name: '浦口', x: 35, y: 35 },
]

// 设计稿尺寸
export const DESIGN_WIDTH = 1920
export const DESIGN_HEIGHT = 1080

// 数据更新间隔（毫秒）
export const UPDATE_INTERVALS = {
  traffic: 3000,
  congestion: 5000,
  alert: 8000,
  environment: 6000,
}
