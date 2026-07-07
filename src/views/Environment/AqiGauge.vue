<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { AqiData } from '@/types/environment'

const props = defineProps<{
  data: AqiData
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: AqiData) => ({
  series: [
    {
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 300,
      splitNumber: 6,
      radius: '90%',
      center: ['50%', '60%'],
      itemStyle: {
        color: data.color,
      },
      progress: {
        show: true,
        roundCap: true,
        width: 18,
      },
      pointer: {
        icon: 'path://M2090.36389,615.30999 L2## 0.36389,615.30999 C2## 0.36389,615.30999 2## 0.36389,615.30999 2## 0.36389,615.30999 L2## 0.36389,615.30999 Z',
        length: '70%',
        width: 8,
        offsetCenter: [0, '-10%'],
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 18,
          color: [
            [0.17, '#52c41a'],
            [0.33, '#a0d911'],
            [0.5, '#faad14'],
            [0.67, '#ff7a45'],
            [0.83, '#ff4d4f'],
            [1, '#990000'],
          ],
        },
      },
      axisTick: {
        splitNumber: 2,
        lineStyle: {
          width: 2,
          color: '#999',
        },
      },
      splitLine: {
        length: 12,
        lineStyle: {
          width: 3,
          color: '#999',
        },
      },
      axisLabel: {
        distance: 25,
        color: '#a0cfff',
        fontSize: 12,
      },
      title: {
        offsetCenter: [0, '30%'],
        fontSize: 18,
        color: data.color,
        fontWeight: 'bold',
      },
      detail: {
        fontSize: 48,
        offsetCenter: [0, '55%'],
        valueAnimation: true,
        color: data.color,
        formatter: '{value}',
      },
      data: [
        {
          value: data.value,
          name: data.level,
        },
      ],
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
  <div ref="chartRef" class="aqi-gauge"></div>
</template>

<style scoped>
.aqi-gauge {
  width: 100%;
  height: 300px;
}
</style>
