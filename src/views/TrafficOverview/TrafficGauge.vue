<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  value: number
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (value: number) => ({
  series: [
    {
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      splitNumber: 10,
      radius: '90%',
      center: ['50%', '60%'],
      itemStyle: {
        color: value > 80 ? '#ff4d4f' : value > 60 ? '#faad14' : '#52c41a',
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
            [0.3, '#52c41a'],
            [0.7, '#faad14'],
            [1, '#ff4d4f'],
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
        color: '#a0cfff',
      },
      detail: {
        fontSize: 42,
        offsetCenter: [0, '55%'],
        valueAnimation: true,
        color: value > 80 ? '#ff4d4f' : value > 60 ? '#faad14' : '#52c41a',
        formatter: '{value}',
      },
      data: [
        {
          value,
          name: '交通指数',
        },
      ],
    },
  ],
})

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    chart.setOption(getOption(props.value))
  }
})

watch(
  () => props.value,
  (newValue) => {
    chart?.setOption(getOption(newValue))
  }
)
</script>

<template>
  <div ref="chartRef" class="traffic-gauge"></div>
</template>

<style scoped>
.traffic-gauge {
  width: 100%;
  height: 300px;
}
</style>
