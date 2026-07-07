<script setup lang="ts">
import type { AlertItem } from '@/types/traffic'

const props = defineProps<{
  alerts: AlertItem[]
}>()

const getLevelClass = (level: AlertItem['level']) => {
  switch (level) {
    case 'high':
      return 'level-high'
    case 'medium':
      return 'level-medium'
    case 'low':
      return 'level-low'
  }
}

const getLevelText = (level: AlertItem['level']) => {
  switch (level) {
    case 'high':
      return '高'
    case 'medium':
      return '中'
    case 'low':
      return '低'
  }
}

const getTypeIcon = (type: AlertItem['type']) => {
  switch (type) {
    case 'accident':
      return '🚨'
    case 'congestion':
      return '🚗'
    case 'construction':
      return '🚧'
    case 'weather':
      return '🌧️'
  }
}
</script>

<template>
  <div class="alert-list">
    <div class="alert-scroll">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        class="alert-item"
      >
        <div class="alert-icon">{{ getTypeIcon(alert.type) }}</div>
        <div class="alert-content">
          <div class="alert-header">
            <span class="alert-location">{{ alert.location }}</span>
            <span class="alert-level" :class="getLevelClass(alert.level)">
              {{ getLevelText(alert.level) }}
            </span>
          </div>
          <div class="alert-message">{{ alert.message }}</div>
          <div class="alert-time">{{ alert.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-list {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.alert-scroll {
  animation: scroll-up 30s linear infinite;
}

.alert-list:hover .alert-scroll {
  animation-play-state: paused;
}

.alert-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  background: rgba(0, 212, 255, 0.05);
  border-left: 3px solid #00d4ff;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.alert-item:hover {
  background: rgba(0, 212, 255, 0.1);
  transform: translateX(4px);
}

.alert-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.alert-content {
  flex: 1;
  min-width: 0;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.alert-location {
  font-size: 13px;
  color: #fff;
  font-weight: 500;
}

.alert-level {
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
}

.level-high {
  background: rgba(255, 77, 79, 0.2);
  color: #ff7875;
}

.level-medium {
  background: rgba(250, 173, 20, 0.2);
  color: #ffc53d;
}

.level-low {
  background: rgba(82, 196, 26, 0.2);
  color: #73d13d;
}

.alert-message {
  font-size: 12px;
  color: #a0cfff;
  margin-bottom: 4px;
  line-height: 1.4;
}

.alert-time {
  font-size: 11px;
  color: #6a7a9a;
}

@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>
