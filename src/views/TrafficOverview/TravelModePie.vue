<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { TravelModeItem } from '@/types/traffic'

const props = defineProps<{
  data: TravelModeItem[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const getOption = (data: TravelModeItem[]) => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
    formatter: '{b}: {c}% ({d}%)',
  },
  legend: {
    orient: 'vertical',
    right: 10,
    top: 'center',
    textStyle: { color: '#a0cfff', fontSize: 12 },
  },
  series: [
    {
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#0a0e27',
        borderWidth: 2,
      },
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
        },
      },
      labelLine: {
        show: false,
      },
      data: data.map((item, index) => ({
        value: item.value,
        name: `${item.icon} ${item.name}`,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: ['#00d4ff', '#00ff88', '#faad14', '#aa66ff', '#66ffcc'][index % 5] },
            { offset: 1, color: ['#0099cc', '#00cc66', '#cc8800', '#8844cc', '#44ccaa'][index % 5] },
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
  <div ref="chartRef" class="travel-mode-pie"></div>
</template>

<style scoped>
.travel-mode-pie {
  width: 100%;
  height: 100%;
}
</style>
