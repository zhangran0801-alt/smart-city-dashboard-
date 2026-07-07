<script setup lang="ts">
import type { NoiseItem } from '@/types/environment'

defineProps<{
  data: NoiseItem[]
}>()

const getNoiseColor = (level: NoiseItem['level']) => {
  switch (level) {
    case 'quiet':
      return '#52c41a'
    case 'normal':
      return '#faad14'
    case 'noisy':
      return '#ff4d4f'
  }
}
</script>

<template>
  <div class="noise-scatter">
    <div class="noise-map">
      <!-- 简化地图背景 -->
      <svg viewBox="0 0 100 100" class="map-bg">
        <path
          d="M 20,20 Q 30,15 40,18 L 60,20 Q 75,22 80,30 L 82,50 Q 80,65 75,75 L 60,80 Q 45,82 35,78 L 25,70 Q 18,60 20,45 Z"
          fill="rgba(0, 212, 255, 0.05)"
          stroke="rgba(0, 212, 255, 0.2)"
          stroke-width="0.5"
        />
      </svg>

      <!-- 噪音监测点 -->
      <div
        v-for="item in data"
        :key="item.id"
        class="noise-point"
        :style="{
          left: `${item.x}%`,
          top: `${item.y}%`,
        }"
      >
        <div
          class="point-circle"
          :style="{ backgroundColor: getNoiseColor(item.level) }"
        >
          <span class="point-value">{{ item.value }}</span>
        </div>
        <div class="point-label">{{ item.location }}</div>
      </div>
    </div>

    <!-- 图例 -->
    <div class="legend">
      <div class="legend-item">
        <div class="legend-dot quiet"></div>
        <span>安静 (&lt;55dB)</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot normal"></div>
        <span>正常 (55-70dB)</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot noisy"></div>
        <span>嘈杂 (&gt;70dB)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.noise-scatter {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.noise-map {
  flex: 1;
  position: relative;
  background: radial-gradient(ellipse at center, rgba(0, 212, 255, 0.03) 0%, transparent 70%);
}

.map-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.noise-point {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.point-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px currentColor;
  opacity: 0.9;
}

.point-value {
  font-size: 12px;
  font-weight: bold;
  color: #fff;
}

.point-label {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 4px;
  font-size: 11px;
  color: #a0cfff;
  white-space: nowrap;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
}

.legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  background: rgba(0, 212, 255, 0.05);
  border-top: 1px solid rgba(0, 212, 255, 0.2);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #a0cfff;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-dot.quiet {
  background: #52c41a;
}

.legend-dot.normal {
  background: #faad14;
}

.legend-dot.noisy {
  background: #ff4d4f;
}
</style>
