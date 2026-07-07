import { randomInt, randomFloat } from './utils'

// 人口分布数据
export interface PopulationData {
  name: string
  value: number
}

// GDP 趋势数据
export interface GdpData {
  years: string[]
  gdp: number[]
  growth: number[]
}

// 产业结构数据
export interface IndustryData {
  name: string
  value: number
  children?: IndustryData[]
}

// 区域对比数据
export interface RegionData {
  indicator: string
  max: number
  xuanwu: number
  qinhuai: number
  jianye: number
  gulou: number
}

/**
 * 生成人口分布数据
 */
export function generatePopulationData(): PopulationData[] {
  return [
    { name: '玄武区', value: randomInt(58, 65) },
    { name: '秦淮区', value: randomInt(72, 80) },
    { name: '建邺区', value: randomInt(45, 52) },
    { name: '鼓楼区', value: randomInt(95, 105) },
    { name: '浦口区', value: randomInt(85, 95) },
    { name: '栖霞区', value: randomInt(68, 76) },
    { name: '雨花台区', value: randomInt(62, 70) },
    { name: '江宁区', value: randomInt(190, 210) },
    { name: '六合区', value: randomInt(88, 98) },
    { name: '溧水区', value: randomInt(48, 55) },
    { name: '高淳区', value: randomInt(42, 48) },
  ]
}

/**
 * 生成 GDP 趋势数据（近 10 年）
 */
export function generateGdpData(): GdpData {
  const years: string[] = []
  const gdp: number[] = []
  const growth: number[] = []

  const baseGdp = 8500 // 2015年基础GDP（亿元）

  for (let i = 0; i < 10; i++) {
    years.push(`${2015 + i}`)

    // GDP逐年增长，增速波动
    const prevGdp = i === 0 ? baseGdp : gdp[i - 1]
    const growthRate = randomFloat(4.5, 8.5, 1) / 100
    const currentGdp = Math.round(prevGdp * (1 + growthRate))

    gdp.push(currentGdp)
    growth.push(parseFloat((growthRate * 100).toFixed(1)))
  }

  return { years, gdp, growth }
}

/**
 * 生成产业结构数据（旭日图）
 */
export function generateIndustryData(): IndustryData[] {
  return [
    {
      name: '第一产业',
      value: randomInt(180, 220),
      children: [
        { name: '农业', value: randomInt(80, 100) },
        { name: '林业', value: randomInt(30, 45) },
        { name: '渔业', value: randomInt(50, 70) },
      ],
    },
    {
      name: '第二产业',
      value: randomInt(5800, 6500),
      children: [
        { name: '制造业', value: randomInt(3200, 3800) },
        { name: '建筑业', value: randomInt(1200, 1500) },
        { name: '能源产业', value: randomInt(800, 1000) },
        { name: '新材料', value: randomInt(400, 600) },
      ],
    },
    {
      name: '第三产业',
      value: randomInt(9500, 10500),
      children: [
        { name: '金融业', value: randomInt(2200, 2600) },
        { name: '信息技术', value: randomInt(1800, 2200) },
        { name: '商贸服务', value: randomInt(1500, 1800) },
        { name: '教育科研', value: randomInt(1200, 1500) },
        { name: '文化旅游', value: randomInt(800, 1100) },
        { name: '医疗健康', value: randomInt(600, 900) },
      ],
    },
  ]
}

/**
 * 生成区域对比数据（雷达图）
 */
export function generateRegionData(): RegionData[] {
  return [
    {
      indicator: 'GDP (亿元)',
      max: 2000,
      xuanwu: randomInt(1100, 1300),
      qinhuai: randomInt(1200, 1400),
      jianye: randomInt(1000, 1200),
      gulou: randomInt(1600, 1900),
    },
    {
      indicator: '人口 (万人)',
      max: 120,
      xuanwu: randomInt(58, 65),
      qinhuai: randomInt(72, 80),
      jianye: randomInt(45, 52),
      gulou: randomInt(95, 105),
    },
    {
      indicator: '人均收入 (万元)',
      max: 10,
      xuanwu: randomFloat(6.5, 7.5, 1),
      qinhuai: randomFloat(6.0, 7.0, 1),
      jianye: randomFloat(7.0, 8.0, 1),
      gulou: randomFloat(7.2, 8.2, 1),
    },
    {
      indicator: '绿化率 (%)',
      max: 60,
      xuanwu: randomInt(42, 48),
      qinhuai: randomInt(35, 42),
      jianye: randomInt(40, 46),
      gulou: randomInt(38, 44),
    },
    {
      indicator: '教育指数',
      max: 100,
      xuanwu: randomInt(85, 95),
      qinhuai: randomInt(80, 90),
      jianye: randomInt(78, 88),
      gulou: randomInt(90, 98),
    },
    {
      indicator: '医疗指数',
      max: 100,
      xuanwu: randomInt(88, 95),
      qinhuai: randomInt(82, 90),
      jianye: randomInt(75, 85),
      gulou: randomInt(92, 98),
    },
  ]
}
