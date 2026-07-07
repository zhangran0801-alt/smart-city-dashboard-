<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { TempHumidityItem } from '@/types/environment'

const props = defineProps<{
  data: TempHumidityItem[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: TempHumidityItem[]) => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
  },
  legend: {
    data: ['温度', '湿度'],
    top: 0,
    textStyle: { color: '#a0cfff', fontSize: 12 },
  },
  grid: {
    top: 35,
    right: 50,
    bottom: 30,
    left: 50,
  },
  xAxis: {
    type: 'category',
    data: data.map((item) => item.district),
    axisLine: { lineStyle: { color: '#4a5a7a' } },
    axisLabel: { color: '#a0cfff', fontSize: 11, rotate: 15 },
  },
  yAxis: [
    {
      type: 'value',
      name: '°C',
      nameTextStyle: { color: '#a0cfff', fontSize: 11 },
      position: 'left',
      axisLine: { show: false },
      axisLabel: { color: '#a0cfff', fontSize: 11 },
      splitLine: { lineStyle: { color: '#2a3a5a', type: 'dashed' } },
    },
    {
      type: 'value',
      name: '%',
      nameTextStyle: { color: '#a0cfff', fontSize: 11 },
      position: 'right',
      axisLine: { show: false },
      axisLabel: { color: '#a0cfff', fontSize: 11 },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: '温度',
      type: 'bar',
      data: data.map((item) => item.temperature),
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#ff7875' },
          { offset: 1, color: '#ff4d4f' },
        ]),
      },
    },
    {
      name: '湿度',
      type: 'bar',
      yAxisIndex: 1,
      data: data.map((item) => item.humidity),
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#69c0ff' },
          { offset: 1, color: '#1890ff' },
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
  <div ref="chartRef" class="temp-humidity-bar"></div>
</template>

<style scoped>
.temp-humidity-bar {
  width: 100%;
  height: 100%;
}
</style>
