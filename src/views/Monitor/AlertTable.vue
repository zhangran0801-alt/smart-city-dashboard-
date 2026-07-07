<script setup lang="ts">
import type { AlertItem } from '@/mock/monitor'

defineProps<{
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

const getStatusClass = (status: AlertItem['status']) => {
  switch (status) {
    case 'pending':
      return 'status-pending'
    case 'processing':
      return 'status-processing'
    case 'resolved':
      return 'status-resolved'
  }
}

const getStatusText = (status: AlertItem['status']) => {
  switch (status) {
    case 'pending':
      return '待处理'
    case 'processing':
      return '处理中'
    case 'resolved':
      return '已解决'
  }
}
</script>

<template>
  <div class="alert-table">
    <div class="table-header">
      <div class="col col-time">时间</div>
      <div class="col col-level">级别</div>
      <div class="col col-type">类型</div>
      <div class="col col-device">设备</div>
      <div class="col col-location">位置</div>
      <div class="col col-message">告警信息</div>
      <div class="col col-status">状态</div>
    </div>
    <div class="table-body">
      <div v-for="alert in alerts" :key="alert.id" class="table-row">
        <div class="col col-time">{{ alert.time }}</div>
        <div class="col col-level">
          <span class="level-badge" :class="getLevelClass(alert.level)">
            {{ getLevelText(alert.level) }}
          </span>
        </div>
        <div class="col col-type">{{ alert.type }}</div>
        <div class="col col-device">{{ alert.device }}</div>
        <div class="col col-location">{{ alert.location }}</div>
        <div class="col col-message">{{ alert.message }}</div>
        <div class="col col-status">
          <span class="status-badge" :class="getStatusClass(alert.status)">
            {{ getStatusText(alert.status) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr 1.5fr 1.5fr 2.5fr 1.5fr;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(0, 212, 255, 0.1);
  border-bottom: 2px solid rgba(0, 212, 255, 0.3);
  font-weight: 600;
  color: #00d4ff;
  font-size: 13px;
}

.table-body {
  flex: 1;
  overflow-y: auto;
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr 1.5fr 1.5fr 2.5fr 1.5fr;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s ease;
  font-size: 13px;
  color: #a0cfff;
}

.table-row:hover {
  background: rgba(0, 212, 255, 0.05);
  transform: translateX(4px);
}

.col-time {
  color: #6a7a9a;
  font-size: 12px;
}

.level-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  display: inline-block;
}

.level-high {
  background: rgba(255, 77, 79, 0.2);
  color: #ff7875;
  border: 1px solid rgba(255, 77, 79, 0.4);
}

.level-medium {
  background: rgba(250, 173, 20, 0.2);
  color: #ffc53d;
  border: 1px solid rgba(250, 173, 20, 0.4);
}

.level-low {
  background: rgba(82, 196, 26, 0.2);
  color: #73d13d;
  border: 1px solid rgba(82, 196, 26, 0.4);
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  display: inline-block;
}

.status-pending {
  background: rgba(255, 77, 79, 0.2);
  color: #ff7875;
  border: 1px solid rgba(255, 77, 79, 0.4);
}

.status-processing {
  background: rgba(250, 173, 20, 0.2);
  color: #ffc53d;
  border: 1px solid rgba(250, 173, 20, 0.4);
}

.status-resolved {
  background: rgba(82, 196, 26, 0.2);
  color: #73d13d;
  border: 1px solid rgba(82, 196, 26, 0.4);
}

.col-message {
  color: #fff;
}
</style>
