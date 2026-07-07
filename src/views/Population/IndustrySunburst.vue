<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { IndustryData } from '@/mock/population'

const props = defineProps<{
  data: IndustryData[]
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

// 三大产业色系 - 每个产业一个色系，子行业用同色系的不同明度
const colorFamilies = [
  {
    main: '#4facfe',
    children: ['#4facfe', '#69b8ff', '#85c5ff', '#a1d2ff'],
  },
  {
    main: '#f5af19',
    children: ['#f5af19', '#f7bf47', '#f9cf75', '#fbdfa3'],
  },
  {
    main: '#43e97b',
    children: ['#43e97b', '#66ed95', '#89f1af', '#acf5c9'],
  },
]

const addColorsToData = (data: IndustryData[]): any[] => {
  return data.map((item, mainIndex) => {
    const family = colorFamilies[mainIndex % 3]

    const coloredItem: any = {
      ...item,
      itemStyle: {
        color: family.main,
        shadowBlur: 12,
        shadowColor: family.main + '50',
      },
    }

    if (item.children && item.children.length > 0) {
      coloredItem.children = item.children.map((child, subIndex) => ({
        ...child,
        itemStyle: {
          color: family.children[subIndex % family.children.length],
        },
      }))
    }

    return coloredItem
  })
}

const getOption = (data: IndustryData[]) => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(10, 14, 39, 0.95)',
    borderColor: '#00d4ff',
    borderWidth: 1,
    textStyle: { color: '#fff', fontSize: 13 },
    formatter: (params: any) => {
      const depth = params.treePathInfo?.length || 1
      const levelText = depth === 2 ? '产业' : '子行业'
      return `<div style="padding: 6px;">
        <div style="font-size: 14px; font-weight: bold; margin-bottom: 4px;">${params.name}</div>
        <div style="color: #a0cfff;">${levelText} · ${params.value} 亿元</div>
      </div>`
    },
  },
  series: [
    {
      type: 'sunburst',
      data: addColorsToData(data),
      radius: ['8%', '92%'],
      center: ['50%', '50%'],
      sort: null,
      emphasis: {
        focus: 'ancestor',
        itemStyle: {
          shadowBlur: 25,
          shadowColor: 'rgba(0, 212, 255, 0.6)',
        },
      },
      levels: [
        {},
        {
          r0: '8%',
          r: '42%',
          itemStyle: {
            borderWidth: 3,
            borderRadius: 4,
          },
          label: {
            rotate: 'tangential',
            fontSize: 15,
            color: '#fff',
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.6)',
            textShadowBlur: 3,
          },
        },
        {
          r0: '42%',
          r: '80%',
          itemStyle: {
            borderWidth: 2,
            borderRadius: 3,
          },
          label: {
            align: 'right',
            fontSize: 11,
            color: '#fff',
            padding: [2, 4],
          },
        },
      ],
      itemStyle: {
        borderRadius: 4,
        borderColor: '#0a0e27',
        borderWidth: 2,
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
