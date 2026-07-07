<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { RegionData } from '@/mock/population'

const props = defineProps<{
  data: RegionData[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: RegionData[]) => ({
  tooltip: {
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
  },
  legend: {
    data: ['玄武区', '秦淮区', '建邺区', '鼓楼区'],
    bottom: 0,
    textStyle: { color: '#a0cfff', fontSize: 12 },
  },
  radar: {
    indicator: data.map((item) => ({
      name: item.indicator,
      max: item.max,
    })),
    shape: 'circle',
    splitNumber: 5,
    axisName: {
      color: '#a0cfff',
      fontSize: 12,
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0, 212, 255, 0.2)',
      },
    },
    splitArea: {
      areaStyle: {
        color: ['rgba(0, 212, 255, 0.02)', 'rgba(0, 212, 255, 0.05)'],
      },
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(0, 212, 255, 0.2)',
      },
    },
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: data.map((item) => item.xuanwu),
          name: '玄武区',
          lineStyle: { color: '#00d4ff', width: 2 },
          areaStyle: { color: 'rgba(0, 212, 255, 0.2)' },
          itemStyle: { color: '#00d4ff' },
        },
        {
          value: data.map((item) => item.qinhuai),
          name: '秦淮区',
          lineStyle: { color: '#00ff88', width: 2 },
          areaStyle: { color: 'rgba(0, 255, 136, 0.2)' },
          itemStyle: { color: '#00ff88' },
        },
        {
          value: data.map((item) => item.jianye),
          name: '建邺区',
          lineStyle: { color: '#faad14', width: 2 },
          areaStyle: { color: 'rgba(250, 173, 20, 0.2)' },
          itemStyle: { color: '#faad14' },
        },
        {
          value: data.map((item) => item.gulou),
          name: '鼓楼区',
          lineStyle: { color: '#ff4d4f', width: 2 },
          areaStyle: { color: 'rgba(255, 77, 79, 0.2)' },
          itemStyle: { color: '#ff4d4f' },
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
  <div ref="chartRef" class="region-radar"></div>
</template>

<style scoped>
.region-radar {
  width: 100%;
  height: 100%;
}
</style>
