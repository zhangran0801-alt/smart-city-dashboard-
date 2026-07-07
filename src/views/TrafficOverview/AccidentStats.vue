<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { AccidentStats } from '@/types/traffic'

const props = defineProps<{
  data: AccidentStats
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: AccidentStats) => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
  },
  legend: {
    data: ['事故数', '受伤人数'],
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
    data: data.months,
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
      name: '事故数',
      type: 'bar',
      data: data.accidents,
      barWidth: 12,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#ff7875' },
          { offset: 1, color: '#ff4d4f' },
        ]),
      },
    },
    {
      name: '受伤人数',
      type: 'bar',
      data: data.injuries,
      barWidth: 12,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#ffc53d' },
          { offset: 1, color: '#faad14' },
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
  <div ref="chartRef" class="accident-stats"></div>
</template>

<style scoped>
.accident-stats {
  width: 100%;
  height: 100%;
}
</style>
