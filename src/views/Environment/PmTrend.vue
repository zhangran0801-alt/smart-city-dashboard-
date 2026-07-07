<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { PmTrendData } from '@/types/environment'

const props = defineProps<{
  data: PmTrendData
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: PmTrendData) => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
  },
  legend: {
    data: ['PM2.5', 'PM10'],
    top: 0,
    textStyle: { color: '#a0cfff', fontSize: 12 },
  },
  grid: {
    top: 35,
    right: 20,
    bottom: 30,
    left: 50,
  },
  xAxis: {
    type: 'category',
    data: data.times,
    axisLine: { lineStyle: { color: '#4a5a7a' } },
    axisLabel: { color: '#a0cfff', fontSize: 11 },
  },
  yAxis: {
    type: 'value',
    name: 'μg/m³',
    nameTextStyle: { color: '#a0cfff', fontSize: 11 },
    axisLine: { show: false },
    axisLabel: { color: '#a0cfff', fontSize: 11 },
    splitLine: { lineStyle: { color: '#2a3a5a', type: 'dashed' } },
  },
  series: [
    {
      name: 'PM2.5',
      type: 'line',
      data: data.pm25,
      smooth: true,
      symbol: 'none',
      lineStyle: {
        width: 2,
        color: '#00d4ff',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
          { offset: 1, color: 'rgba(0, 212, 255, 0.05)' },
        ]),
      },
    },
    {
      name: 'PM10',
      type: 'line',
      data: data.pm10,
      smooth: true,
      symbol: 'none',
      lineStyle: {
        width: 2,
        color: '#faad14',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(250, 173, 20, 0.3)' },
          { offset: 1, color: 'rgba(250, 173, 20, 0.05)' },
        ]),
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
  <div ref="chartRef" class="pm-trend"></div>
</template>

<style scoped>
.pm-trend {
  width: 100%;
  height: 100%;
}
</style>
