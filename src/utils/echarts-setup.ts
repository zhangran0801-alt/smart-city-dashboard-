import * as echarts from 'echarts/core'
import {
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  ScatterChart,
  SunburstChart,
  RadarChart,
  MapChart,
  type BarSeriesOption,
  type LineSeriesOption,
  type PieSeriesOption,
  type GaugeSeriesOption,
  type ScatterSeriesOption,
  type SunburstSeriesOption,
  type RadarSeriesOption,
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
  type TitleComponentOption,
  type TooltipComponentOption,
  type GridComponentOption,
  type LegendComponentOption,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 按需注册图表类型和组件
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  ScatterChart,
  SunburstChart,
  RadarChart,
  MapChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
  CanvasRenderer,
])

// 导出组合类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | GaugeSeriesOption
  | ScatterSeriesOption
  | SunburstSeriesOption
  | RadarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
>

// 注册暗色主题
echarts.registerTheme('dark-tech', {
  color: ['#00d4ff', '#00ff88', '#ffaa00', '#ff4466', '#aa66ff', '#66ffcc'],
  backgroundColor: 'transparent',
  textStyle: {
    color: '#a0cfff',
  },
  title: {
    textStyle: {
      color: '#ffffff',
    },
    subtextStyle: {
      color: '#a0cfff',
    },
  },
  legend: {
    textStyle: {
      color: '#a0cfff',
    },
  },
  tooltip: {
    backgroundColor: 'rgba(6, 25, 73, 0.9)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
    textStyle: {
      color: '#a0cfff',
    },
  },
})

/**
 * 初始化 ECharts 实例
 */
export function initChart(el: HTMLElement, theme = 'dark-tech') {
  return echarts.init(el, theme)
}

export { echarts }
