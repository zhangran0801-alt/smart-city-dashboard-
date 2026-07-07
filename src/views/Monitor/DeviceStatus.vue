<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { DeviceStatus } from '@/mock/monitor'

const props = defineProps<{
  data: DeviceStatus[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: DeviceStatus[]) => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['在线', '离线', '告警'],
    top: 0,
    textStyle: { color: '#a0cfff', fontSize: 12 },
  },
  grid: {
    top: 35,
    right: 20,
    bottom: 30,
    left: 80,
  },
  xAxis: {
    type: 'value',
    axisLine: { show: false },
    axisLabel: { color: '#a0cfff', fontSize: 11 },
    splitLine: { lineStyle: { color: '#2a3a5a', type: 'dashed' } },
  },
  yAxis: {
    type: 'category',
    data: data.map((item) => item.category),
    axisLine: { lineStyle: { color: '#4a5a7a' } },
    axisLabel: { color: '#a0cfff', fontSize: 12 },
  },
  series: [
    {
      name: '在线',
      type: 'bar',
      stack: 'total',
      data: data.map((item) => item.online),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#52c41a' },
          { offset: 1, color: '#73d13d' },
        ]),
      },
    },
    {
      name: '离线',
      type: 'bar',
      stack: 'total',
      data: data.map((item) => item.offline),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#ff4d4f' },
          { offset: 1, color: '#ff7875' },
        ]),
      },
    },
    {
      name: '告警',
      type: 'bar',
      stack: 'total',
      data: data.map((item) => item.warning),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#faad14' },
          { offset: 1, color: '#ffc53d' },
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
  <div ref="chartRef" class="device-status"></div>
</template>

<style scoped>
.device-status {
  width: 100%;
  height: 100%;
}
</style>
