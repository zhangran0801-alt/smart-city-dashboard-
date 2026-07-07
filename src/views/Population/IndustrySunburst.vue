<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { IndustryData } from '@/mock/population'

const props = defineProps<{
  data: IndustryData[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

// 三大产业主色调 - 更鲜艳的渐变
const mainColors = [
  { start: '#00f2fe', end: '#4facfe', glow: '#00f2fe' }, // 第一产业 - 青蓝
  { start: '#fa709a', end: '#fee140', glow: '#fa709a' }, // 第二产业 - 粉红黄
  { start: '#43e97b', end: '#38f9d7', glow: '#43e97b' }, // 第三产业 - 青绿
]

// 子行业配色 - 每个产业的子分类用不同色调
const subColors = [
  // 第一产业子色
  [
    { start: '#00c6fb', end: '#005bea' },
    { start: '#48c6ef', end: '#6f86d6' },
    { start: '#0ba360', end: '#3cba92' },
  ],
  // 第二产业子色
  [
    { start: '#ff6e7f', end: '#bfe9ff' },
    { start: '#f093fb', end: '#f5576c' },
    { start: '#ffecd2', end: '#fcb69f' },
    { start: '#ff9a9e', end: '#fecfef' },
  ],
  // 第三产业子色
  [
    { start: '#a8edea', end: '#fed6e3' },
    { start: '#d299c2', end: '#fef9d7' },
    { start: '#89f7fe', end: '#66a6ff' },
    { start: '#fddb92', end: '#d1fdff' },
    { start: '#c1dfc4', end: '#deecdd' },
    { start: '#96fbc4', end: '#f9f586' },
  ],
]

const getOption = (data: IndustryData[]) => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(10, 14, 39, 0.95)',
    borderColor: '#00d4ff',
    borderWidth: 2,
    textStyle: {
      color: '#fff',
      fontSize: 13,
    },
    formatter: (params: any) => {
      const depth = params.treePathInfo?.length || 1
      const levelText = depth === 2 ? '产业' : '子行业'
      return `<div style="padding: 8px;">
        <div style="font-size: 15px; font-weight: bold; margin-bottom: 6px;">${params.name}</div>
        <div style="color: #a0cfff;">类型: ${levelText}</div>
        <div style="color: #00d4ff; margin-top: 4px;">产值: <span style="font-weight: bold;">${params.value} 亿元</span></div>
      </div>`
    },
  },
  series: [
    {
      type: 'sunburst',
      data: data,
      radius: [0, '95%'],
      center: ['50%', '50%'],
      sort: null,
      emphasis: {
        focus: 'ancestor',
        itemStyle: {
          shadowBlur: 30,
          shadowColor: 'rgba(0, 212, 255, 0.8)',
        },
      },
      levels: [
        {},
        {
          r0: '12%',
          r: '45%',
          itemStyle: {
            borderWidth: 3,
            borderRadius: 6,
          },
          label: {
            rotate: 'tangential',
            fontSize: 16,
            color: '#fff',
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.8)',
            textShadowBlur: 4,
          },
        },
        {
          r0: '45%',
          r: '78%',
          itemStyle: {
            borderWidth: 2,
            borderRadius: 4,
          },
          label: {
            align: 'right',
            fontSize: 12,
            color: '#fff',
            fontWeight: '500',
            padding: [2, 5],
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 3,
          },
        },
      ],
      itemStyle: {
        borderRadius: 5,
        borderColor: 'rgba(10, 14, 39, 0.8)',
        borderWidth: 2,
        color: (params: any) => {
          const depth = params.treePathInfo?.length || 1
          const index = params.dataIndex || 0

          // 第一层（三大产业）
          if (depth === 2) {
            return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: mainColors[index % 3].start },
              { offset: 1, color: mainColors[index % 3].end },
            ])
          }

          // 第二层（子行业）
          const parentIndex = params.treePathInfo?.[1]?.dataIndex || 0
          const subColorSet = subColors[parentIndex % 3]
          const subColor = subColorSet[index % subColorSet.length]

          return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: subColor.start },
            { offset: 1, color: subColor.end },
          ])
        },
        shadowBlur: 10,
        shadowColor: 'rgba(0, 212, 255, 0.3)',
      },
    },
  ],
})

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    chart.setOption(getOption(props.data))
  }
})

watch(
  () => props.data,
  (newData) => {
    chart?.setOption(getOption(newData))
  },
  { deep: true }
)
</script>

<template>
  <div ref="chartRef" class="industry-sunburst"></div>
</template>

<style scoped>
.industry-sunburst {
  width: 100%;
  height: 100%;
}
</style>
