<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { GdpData } from '@/mock/population'

const props = defineProps<{
  data: GdpData
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: GdpData) => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
    axisPointer: {
      type: 'cross',
    },
  },
  legend: {
    data: ['GDP', '增长率'],
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
    data: data.years,
    axisLine: { lineStyle: { color: '#4a5a7a' } },
    axisLabel: { color: '#a0cfff', fontSize: 11 },
  },
  yAxis: [
    {
      type: 'value',
      name: '亿元',
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
      name: 'GDP',
      type: 'line',
      data: data.gdp,
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 3,
        color: '#00d4ff',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
          { offset: 1, color: 'rgba(0, 212, 255, 0.05)' },
        ]),
      },
      itemStyle: {
        color: '#00d4ff',
      },
    },
    {
      name: '增长率',
      type: 'bar',
      yAxisIndex: 1,
      data: data.growth,
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 255, 136, 0.6)' },
          { offset: 1, color: 'rgba(0, 255, 136, 0.2)' },
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
  <div ref="chartRef" class="gdp-area-chart"></div>
</template>

<style scoped>
.gdp-area-chart {
  width: 100%;
  height: 100%;
}
</style>
