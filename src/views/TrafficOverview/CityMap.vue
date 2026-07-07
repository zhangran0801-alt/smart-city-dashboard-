<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { MapMarker } from '@/types/traffic'

const props = defineProps<{
  markers: MapMarker[]
}>()

// 南京主要地标
const landmarks = ref([
  { id: '1', name: '新街口', x: 48, y: 42, value: 98, status: 'danger' as const, icon: '🏙️' },
  { id: '2', name: '夫子庙', x: 52, y: 58, value: 85, status: 'warning' as const, icon: '🏛️' },
  { id: '3', name: '南京站', x: 50, y: 25, value: 72, status: 'normal' as const, icon: '🚉' },
  { id: '4', name: '南京南站', x: 52, y: 78, value: 68, status: 'normal' as const, icon: '🚄' },
  { id: '5', name: '奥体中心', x: 32, y: 55, value: 45, status: 'normal' as const, icon: '🏟️' },
  { id: '6', name: '中山陵', x: 72, y: 40, value: 58, status: 'warning' as const, icon: '⛰️' },
  { id: '7', name: '玄武湖', x: 55, y: 32, value: 32, status: 'normal' as const, icon: '🌊' },
  { id: '8', name: '河西CBD', x: 35, y: 48, value: 76, status: 'warning' as const, icon: '🏢' },
])

// 飞线数据
const flyLines = computed(() => {
  const pairs = [[0, 5], [2, 4], [1, 3], [7, 6], [0, 3], [4, 1]]
  return pairs.map(([from, to], i) => ({
    from: landmarks.value[from],
    to: landmarks.value[to],
    id: i
  }))
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'danger': return '#ff4d4f'
    case 'warning': return '#faad14'
    default: return '#00d4ff'
  }
}

// 更新地标数据
const updateLandmarks = () => {
  landmarks.value = landmarks.value.map(lm => {
    const newValue = Math.max(20, Math.min(100, lm.value + Math.round((Math.random() - 0.5) * 10)))
    const status = newValue > 80 ? 'danger' : newValue > 60 ? 'warning' : 'normal'
    return { ...lm, value: newValue, status }
  })
}

let timer: number | null = null
onMounted(() => { timer = window.setInterval(updateLandmarks, 3000) })
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <div class="city-map">
    <!-- SVG 地图内容 -->
    <svg class="map-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <!-- 网格 -->
      <defs>
        <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(0,212,255,0.06)" stroke-width="0.1"/>
        </pattern>
        <linearGradient id="flyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,212,255,0)" />
          <stop offset="50%" stop-color="rgba(0,212,255,0.8)" />
          <stop offset="100%" stop-color="rgba(0,212,255,0)" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />

      <!-- 长江 -->
      <path d="M 0,18 Q 25,15 50,20 T 100,22" fill="none" stroke="rgba(0,150,255,0.25)" stroke-width="4" stroke-linecap="round"/>
      <path d="M 0,18 Q 25,15 50,20 T 100,22" fill="none" stroke="rgba(0,200,255,0.4)" stroke-width="1.5" stroke-dasharray="3 2" class="river-flow"/>

      <!-- 区域轮廓 -->
      <path d="M 40,22 L 58,22 L 62,38 L 58,48 L 40,48 L 36,35 Z" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.2)" stroke-width="0.3"/>
      <text x="49" y="36" fill="rgba(160,207,255,0.5)" font-size="2.5" text-anchor="middle">玄武区</text>

      <path d="M 40,48 L 58,48 L 62,62 L 55,70 L 40,70 L 36,58 Z" fill="rgba(250,173,20,0.06)" stroke="rgba(250,173,20,0.2)" stroke-width="0.3"/>
      <text x="49" y="60" fill="rgba(160,207,255,0.5)" font-size="2.5" text-anchor="middle">秦淮区</text>

      <path d="M 22,30 L 40,30 L 36,48 L 30,58 L 22,55 L 20,42 Z" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.2)" stroke-width="0.3"/>
      <text x="30" y="44" fill="rgba(160,207,255,0.5)" font-size="2.5" text-anchor="middle">建邺区</text>

      <path d="M 22,22 L 40,22 L 36,30 L 22,30 Z" fill="rgba(255,77,79,0.06)" stroke="rgba(255,77,79,0.2)" stroke-width="0.3"/>
      <text x="30" y="27" fill="rgba(160,207,255,0.5)" font-size="2.5" text-anchor="middle">鼓楼区</text>

      <path d="M 62,22 L 82,22 L 85,38 L 80,48 L 62,42 L 58,32 Z" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.2)" stroke-width="0.3"/>
      <text x="72" y="36" fill="rgba(160,207,255,0.5)" font-size="2.5" text-anchor="middle">栖霞区</text>

      <path d="M 30,58 L 55,62 L 58,75 L 52,82 L 30,82 L 26,72 Z" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.2)" stroke-width="0.3"/>
      <text x="42" y="74" fill="rgba(160,207,255,0.5)" font-size="2.5" text-anchor="middle">江宁区</text>

      <!-- 飞线 -->
      <g v-for="line in flyLines" :key="line.id">
        <path
          :d="`M ${line.from.x},${line.from.y} Q ${(line.from.x + line.to.x) / 2},${Math.min(line.from.y, line.to.y) - 8} ${line.to.x},${line.to.y}`"
          fill="none"
          stroke="url(#flyGrad)"
          stroke-width="0.4"
          stroke-dasharray="2 3"
          class="fly-anim"
        />
      </g>

      <!-- 地标点 -->
      <g v-for="lm in landmarks" :key="lm.id">
        <!-- 脉冲圈 -->
        <circle :cx="lm.x" :cy="lm.y" r="2" :fill="getStatusColor(lm.status)" opacity="0.3" class="pulse-svg"/>
        <circle :cx="lm.x" :cy="lm.y" r="1.5" :fill="getStatusColor(lm.status)" opacity="0.5" class="pulse-svg-2"/>
        <!-- 主点 -->
        <circle :cx="lm.x" :cy="lm.y" r="1.2" :fill="getStatusColor(lm.status)"/>
        <!-- 名称 -->
        <text :x="lm.x + 2.5" :y="lm.y + 0.8" fill="#fff" font-size="2.2" font-weight="bold">{{ lm.name }}</text>
        <text :x="lm.x + 2.5" :y="lm.y + 3.2" :fill="getStatusColor(lm.status)" font-size="1.8">{{ lm.value }}</text>
      </g>
    </svg>

    <!-- 图例 -->
    <div class="map-legend">
      <div class="legend-item"><span class="dot danger"></span>拥堵</div>
      <div class="legend-item"><span class="dot warning"></span>缓行</div>
      <div class="legend-item"><span class="dot normal"></span>畅通</div>
    </div>
  </div>
</template>

<style scoped>
.city-map {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.map-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* 河流流动 */
.river-flow {
  animation: river-flow 4s linear infinite;
}

/* 脉冲动画 */
.pulse-svg {
  animation: svg-pulse 2s ease-out infinite;
  transform-origin: center;
}

.pulse-svg-2 {
  animation: svg-pulse 2s ease-out infinite 1s;
  transform-origin: center;
}

/* 飞线动画 */
.fly-anim {
  animation: fly-dash 3s linear infinite;
}

/* 图例 */
.map-legend {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 10px;
  background: rgba(10, 14, 39, 0.8);
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: #a0cfff;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dot.danger { background: #ff4d4f; box-shadow: 0 0 4px #ff4d4f; }
.dot.warning { background: #faad14; box-shadow: 0 0 4px #faad14; }
.dot.normal { background: #00d4ff; box-shadow: 0 0 4px #00d4ff; }

@keyframes svg-pulse {
  0% { r: 2; opacity: 0.6; }
  100% { r: 6; opacity: 0; }
}

@keyframes river-flow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -20; }
}

@keyframes fly-dash {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -20; }
}
</style>
