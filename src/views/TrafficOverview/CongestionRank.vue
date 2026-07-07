<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { CongestionItem } from '@/types/traffic'

const props = defineProps<{
  data: CongestionItem[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: CongestionItem[]) => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
  },
  grid: {
    top: 10,
    right: 60,
    bottom: 10,
    left: 10,
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    axisLine: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false },
  },
  yAxis: {
    type: 'category',
    data: data.map((item) => item.name).reverse(),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#a0cfff',
      fontSize: 12,
    },
  },
  series: [
    {
      type: 'bar',
      data: data.map((item) => ({
        value: item.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: item.value > 80 ? '#ff4d4f' : item.value > 60 ? '#faad14' : '#52c41a' },
            { offset: 1, color: item.value > 80 ? '#ff7875' : item.value > 60 ? '#ffc53d' : '#73d13d' },
          ]),
        },
      })).reverse(),
      barWidth: 16,
      label: {
        show: true,
        position: 'right',
        color: '#a0cfff',
        fontSize: 12,
        formatter: '{c}',
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
  <div ref="chartRef" class="congestion-rank"></div>
</template>

<style scoped>
.congestion-rank {
  width: 100%;
  height: 100%;
}
</style>
