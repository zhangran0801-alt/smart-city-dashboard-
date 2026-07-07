<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { PopulationData } from '@/mock/population'

const props = defineProps<{
  data: PopulationData[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: PopulationData[]) => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
    formatter: '{b}: {c} 万人 ({d}%)',
  },
  series: [
    {
      type: 'pie',
      roseType: 'area',
      radius: [20, 140],
      center: ['50%', '55%'],
      itemStyle: {
        borderRadius: 5,
        borderColor: '#0a0e27',
        borderWidth: 2,
      },
      label: {
        color: '#a0cfff',
        fontSize: 12,
        formatter: '{b}\n{c}万',
      },
      labelLine: {
        lineStyle: {
          color: '#4a5a7a',
        },
      },
      data: data.map((item, index) => ({
        value: item.value,
        name: item.name,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: ['#00d4ff', '#00ff88', '#faad14', '#ff4d4f', '#aa66ff', '#66ffcc', '#ff7875', '#ffc53d', '#73d13d', '#597ef7', '#ff85c0'][index % 11] },
            { offset: 1, color: ['#0099cc', '#00cc66', '#cc8800', '#cc0000', '#8844cc', '#44ccaa', '#cc4444', '#cc9900', '#44aa00', '#3355cc', '#cc5588'][index % 11] },
          ]),
        },
      })),
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
  <div ref="chartRef" class="population-rose"></div>
</template>

<style scoped>
.population-rose {
  width: 100%;
  height: 100%;
}
</style>
