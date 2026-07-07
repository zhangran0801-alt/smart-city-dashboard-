/**
 * ECharts 暗色主题配置
 */
export function useChartTheme() {
  const colors = [
    '#00d4ff', // 主色蓝
    '#00ff88', // 成功绿
    '#ffaa00', // 警告黄
    '#ff4466', // 危险红
    '#aa66ff', // 紫色
    '#66ffcc', // 青色
  ]

  const axisStyle = {
    axisLine: {
      lineStyle: {
        color: 'rgba(160, 207, 255, 0.3)',
      },
    },
    axisTick: {
      lineStyle: {
        color: 'rgba(160, 207, 255, 0.3)',
      },
    },
    axisLabel: {
      color: '#a0cfff',
      fontSize: 12,
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(160, 207, 255, 0.1)',
        type: 'dashed' as const,
      },
    },
  }

  const tooltipStyle = {
    backgroundColor: 'rgba(6, 25, 73, 0.9)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
    borderWidth: 1,
    textStyle: {
      color: '#a0cfff',
    },
  }

  const legendStyle = {
    textStyle: {
      color: '#a0cfff',
    },
  }

  return { colors, axisStyle, tooltipStyle, legendStyle }
}
