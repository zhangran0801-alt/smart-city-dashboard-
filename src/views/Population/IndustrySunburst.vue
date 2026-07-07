<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { IndustryData } from '@/mock/population'

const props = defineProps<{
  data: IndustryData[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const colors = ['#00d4ff', '#00ff88', '#faad14']
const childColors = ['#0099cc', '#00cc66', '#cc8800']

// 根据层级获取颜色
const getColor = (depth: number, index: number, parentIndex: number) => {
  if (depth === 2) {
    return colors[index % colors.length]
  }
  return childColors[parentIndex % childColors.length]
}

const getOption = (data: IndustryData[]) => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#00d4ff',
    textStyle: { color: '#fff' },
    formatter: '{b}: {c} 亿元',
  },
  series: [
    {
      type: 'sunburst',
      data: data,
      radius: [0, '90%'],
      center: ['50%', '50%'],
      sort: null,
      emphasis: {
        focus: 'ancestor',
      },
      levels: [
        {},
        {
          r0: '15%',
          r: '40%',
          itemStyle: {
            borderWidth: 2,
          },
          label: {
            rotate: 'tangential',
            fontSize: 14,
            color: '#fff',
          },
        },
        {
          r0: '40%',
          r: '75%',
          label: {
            align: 'right',
            fontSize: 12,
            color: '#a0cfff',
          },
          itemStyle: {
            borderWidth: 2,
          },
        },
        {
          r0: '75%',
          r: '90%',
          label: {
            position: 'outside',
            padding: 3,
            silent: false,
            fontSize: 11,
            color: '#a0cfff',
          },
          itemStyle: {
            borderWidth: 3,
          },
        },
      ],
      itemStyle: {
        borderRadius: 4,
        borderColor: '#0a0e27',
        borderWidth: 2,
        color: (params: any) => {
          const depth = params.treePathInfo?.length || 1
          const index = params.dataIndex || 0
          const parentIndex = params.treePathInfo?.[1]?.dataIndex || 0
          return getColor(depth, index, parentIndex)
        },
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
  <div ref="chartRef" class="industry-sunburst"></div>
</template>

<style scoped>
.industry-sunburst {
  width: 100%;
  height: 100%;
}
</style>
