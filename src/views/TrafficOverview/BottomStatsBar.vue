<script setup lang="ts">
import { ref, watch } from 'vue'
import type { BottomStats } from '@/types/traffic'

const props = defineProps<{
  stats: BottomStats
}>()

const animatedStats = ref({
  totalTrips: 0,
  onlineVehicles: 0,
  accidents: 0,
  avgSpeed: 0,
  congestionIndex: 0,
})

const animateNumber = (target: number, current: number, key: keyof typeof animatedStats.value) => {
  const duration = 1000
  const steps = 30
  const increment = (target - current) / steps
  let step = 0

  const timer = setInterval(() => {
    step++
    if (step >= steps) {
      animatedStats.value[key] = target
      clearInterval(timer)
    } else {
      animatedStats.value[key] = Math.round(current + increment * step)
    }
  }, duration / steps)
}

watch(
  () => props.stats,
  (newStats) => {
    Object.keys(newStats).forEach((key) => {
      const k = key as keyof BottomStats
      animateNumber(newStats[k], animatedStats.value[k], k)
    })
  },
  { immediate: true, deep: true }
)

const formatNumber = (num: number) => {
  return num.toLocaleString('zh-CN')
}
</script>

<template>
  <div class="bottom-stats-bar">
    <div class="stat-item">
      <div class="stat-icon">🚗</div>
      <div class="stat-info">
        <div class="stat-label">今日出行</div>
        <div class="stat-value">{{ formatNumber(animatedStats.totalTrips) }}</div>
      </div>
    </div>

    <div class="stat-item">
      <div class="stat-icon">📡</div>
      <div class="stat-info">
        <div class="stat-label">在线车辆</div>
        <div class="stat-value">{{ formatNumber(animatedStats.onlineVehicles) }}</div>
      </div>
    </div>

    <div class="stat-item">
      <div class="stat-icon">⚠️</div>
      <div class="stat-info">
        <div class="stat-label">今日事故</div>
        <div class="stat-value danger">{{ animatedStats.accidents }}</div>
      </div>
    </div>

    <div class="stat-item">
      <div class="stat-icon">⚡</div>
      <div class="stat-info">
        <div class="stat-label">平均车速</div>
        <div class="stat-value">{{ animatedStats.avgSpeed }} km/h</div>
      </div>
    </div>

    <div class="stat-item">
      <div class="stat-icon">📊</div>
      <div class="stat-info">
        <div class="stat-label">拥堵指数</div>
        <div class="stat-value" :class="{ warning: animatedStats.congestionIndex > 70 }">
          {{ animatedStats.congestionIndex }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottom-stats-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(180deg, rgba(0, 212, 255, 0.08) 0%, rgba(0, 212, 255, 0.03) 100%);
  border-top: 1px solid rgba(0, 212, 255, 0.2);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background: rgba(0, 212, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.2);
}

.stat-icon {
  font-size: 32px;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  color: #a0cfff;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  font-family: 'Orbitron', monospace;
}

.stat-value.danger {
  color: #ff7875;
}

.stat-value.warning {
  color: #ffc53d;
}
</style>
