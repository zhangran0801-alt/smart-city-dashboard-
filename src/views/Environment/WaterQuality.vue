<script setup lang="ts">
import type { WaterQualityItem } from '@/types/environment'

defineProps<{
  data: WaterQualityItem[]
}>()

const getLevelClass = (level: WaterQualityItem['level']) => {
  switch (level) {
    case 'I':
      return 'level-i'
    case 'II':
      return 'level-ii'
    case 'III':
      return 'level-iii'
    case 'IV':
      return 'level-iv'
    case 'V':
      return 'level-v'
  }
}

const getLevelText = (level: WaterQualityItem['level']) => {
  switch (level) {
    case 'I':
      return 'I类 (优)'
    case 'II':
      return 'II类 (良)'
    case 'III':
      return 'III类 (轻度)'
    case 'IV':
      return 'IV类 (中度)'
    case 'V':
      return 'V类 (重度)'
  }
}
</script>

<template>
  <div class="water-quality">
    <div class="water-table">
      <div class="table-header">
        <div class="col col-name">水体名称</div>
        <div class="col col-ph">pH值</div>
        <div class="col col-do">溶解氧</div>
        <div class="col col-turbidity">浊度</div>
        <div class="col col-level">水质等级</div>
      </div>
      <div class="table-body">
        <div v-for="item in data" :key="item.name" class="table-row">
          <div class="col col-name">
            <span class="water-icon">💧</span>
            {{ item.name }}
          </div>
          <div class="col col-ph">{{ item.ph }}</div>
          <div class="col col-do">{{ item.dissolvedOxygen }} mg/L</div>
          <div class="col col-turbidity">{{ item.turbidity }} NTU</div>
          <div class="col col-level">
            <span class="level-badge" :class="getLevelClass(item.level)">
              {{ getLevelText(item.level) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.water-quality {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.water-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr 2fr;
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
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr 2fr;
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

.col-name {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-weight: 500;
}

.water-icon {
  font-size: 18px;
}

.level-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  display: inline-block;
}

.level-i {
  background: rgba(82, 196, 26, 0.2);
  color: #73d13d;
  border: 1px solid rgba(82, 196, 26, 0.4);
}

.level-ii {
  background: rgba(160, 217, 17, 0.2);
  color: #a0d911;
  border: 1px solid rgba(160, 217, 17, 0.4);
}

.level-iii {
  background: rgba(250, 173, 20, 0.2);
  color: #ffc53d;
  border: 1px solid rgba(250, 173, 20, 0.4);
}

.level-iv {
  background: rgba(255, 122, 69, 0.2);
  color: #ff9c6e;
  border: 1px solid rgba(255, 122, 69, 0.4);
}

.level-v {
  background: rgba(255, 77, 79, 0.2);
  color: #ff7875;
  border: 1px solid rgba(255, 77, 79, 0.4);
}
</style>
