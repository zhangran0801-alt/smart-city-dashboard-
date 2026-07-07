<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { PopulationData } from '@/mock/population'

const props = defineProps<{
  data: PopulationData[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

// 科技感配色方案 - 更亮更炫
const colors = [
  { start: '#00f2fe', end: '#4facfe' }, // 青蓝
  { start: '#43e97b', end: '#38f9d7' }, // 青绿
  { start: '#fa709a', end: '#fee140' }, // 粉红黄
  { start: '#30cfd0', end: '#330867' }, // 青紫
  { start: '#a8edea', end: '#fed6e3' }, // 浅青粉
  { start: '#ff9a9e', end: '#fecfef' }, // 粉红
  { start: '#ffecd2', end: '#fcb69f' }, // 橙
  { start: '#ff6e7f', end: '#bfe9ff' }, // 红蓝
  { start: '#e0c3fc', end: '#8ec5fc' }, // 紫蓝
  { start: '#f093fb', end: '#f5576c' }, // 紫红
  { start: '#4facfe', end: '#00f2fe' }, // 蓝青
]

const getOption = (data: PopulationData[]) => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(10, 14, 39, 0.95)',
    borderColor: '#00d4ff',
    borderWidth: 2,
    textStyle: {
      color: '#fff',
      fontSize: 14,
    },
    formatter: (params: any) => {
      return `<div style="padding: 8px;">
        <div style="font-size: 16px; font-weight: bold; color: ${params.color}; margin-bottom: 6px;">${params.name}</div>
        <div style="color: #a0cfff;">人口: <span style="color: #00d4ff; font-weight: bold;">${params.value} 万</span></div>
        <div style="color: #a0cfff; margin-top: 4px;">占比: <span style="color: #00ff88; font-weight: bold;">${params.percent}%</span></div>
      </div>`
    },
  },
  series: [
    // 外圈装饰
    {
      type: 'pie',
      radius: ['85%', '87%'],
      center: ['50%', '55%'],
      silent: true,
      label: { show: false },
      data: [{ value: 1, itemStyle: { color: 'rgba(0, 212, 255, 0.3)' } }],
    },
    // 主玫瑰图
    {
      type: 'pie',
      roseType: 'area',
      radius: [30, 130],
      center: ['50%', '55%'],
      itemStyle: {
        borderRadius: 8,
        borderColor: 'rgba(0, 212, 255, 0.3)',
        borderWidth: 2,
        shadowBlur: 20,
        shadowColor: 'rgba(0, 212, 255, 0.4)',
      },
      label: {
        show: true,
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowBlur: 4,
        formatter: '{b|{b}}\n{c|{c}万}',
        rich: {
          b: {
            color: '#fff',
            fontSize: 13,
            fontWeight: 'bold',
            lineHeight: 20,
          },
          c: {
            color: '#00d4ff',
            fontSize: 12,
            lineHeight: 18,
          },
        },
      },
      labelLine: {
        show: true,
        length: 15,
        length2: 20,
        lineStyle: {
          color: 'rgba(0, 212, 255, 0.6)',
          width: 2,
        },
      },
      emphasis: {
        scaleSize: 15,
        itemStyle: {
          shadowBlur: 40,
          shadowColor: 'rgba(0, 212, 255, 0.8)',
        },
        label: {
          fontSize: 15,
          fontWeight: 'bold',
        },
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: (idx: number) => idx * 100,
      data: data.map((item, index) => ({
        value: item.value,
        name: item.name,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: colors[index % colors.length].start },
            { offset: 1, color: colors[index % colors.length].end },
          ]),
          shadowBlur: 15,
          shadowColor: colors[index % colors.length].start + '80',
        },
      })),
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
  <div ref="chartRef" class="population-rose"></div>
</template>

<style scoped>
.population-rose {
  width: 100%;
  height: 100%;
}
</style>
