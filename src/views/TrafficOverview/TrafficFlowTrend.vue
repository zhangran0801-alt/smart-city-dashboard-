<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { TrafficFlowData } from '@/types/traffic'

const props = defineProps<{
  data: TrafficFlowData
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: TrafficFlowData) => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
  },
  grid: {
    top: 30,
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
    axisLine: { show: false },
    axisLabel: { color: '#a0cfff', fontSize: 11 },
    splitLine: { lineStyle: { color: '#2a3a5a', type: 'dashed' } },
  },
  series: [
    {
      type: 'line',
      data: data.values,
      smooth: true,
      symbol: 'none',
      lineStyle: {
        width: 3,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#00d4ff' },
          { offset: 1, color: '#00ff88' },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
          { offset: 1, color: 'rgba(0, 212, 255, 0.05)' },
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
  <div ref="chartRef" class="traffic-flow-trend"></div>
</template>

<style scoped>
.traffic-flow-trend {
  width: 100%;
  height: 300px;
}
</style>
