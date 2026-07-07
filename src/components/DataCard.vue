<script setup lang="ts">
import { computed } from 'vue'
import { useNumberAnimation } from '@/composables/useNumberAnimation'
import { formatLargeNumber } from '@/utils/formatter'

const props = withDefaults(
  defineProps<{
    title: string
    value: number
    icon?: string
    unit?: string
    trend?: 'up' | 'down' | 'flat'
    trendValue?: string
    color?: string
  }>(),
  {
    icon: '📊',
    unit: '',
    trend: 'flat',
    trendValue: '',
    color: 'primary',
  }
)

const valueRef = computed(() => props.value)
const { displayValue } = useNumberAnimation(valueRef, 1500)

const formattedValue = computed(() => formatLargeNumber(displayValue.value))

const trendIcon = computed(() => {
  switch (props.trend) {
    case 'up':
      return '↑'
    case 'down':
      return '↓'
    default:
      return ''
  }
})

const trendClass = computed(() => `trend-${props.trend}`)
</script>

<template>
  <div class="data-card" :class="`data-card-${color}`">
    <div class="card-icon">{{ icon }}</div>
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-value">
        <span class="value-number">{{ formattedValue }}</span>
        <span v-if="unit" class="value-unit">{{ unit }}</span>
      </div>
      <div v-if="trendValue" class="card-trend" :class="trendClass">
        <span class="trend-icon">{{ trendIcon }}</span>
        <span class="trend-text">{{ trendValue }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  background: $color-bg-panel;
  border: 1px solid $color-border-light;
  border-radius: $radius-md;
  transition: all 0.3s ease;

  &:hover {
    border-color: $color-border;
    transform: translateY(-2px);
    box-shadow: $shadow-glow;
  }

  &-primary {
    --card-color: #{$color-primary};
  }

  &-success {
    --card-color: #{$color-success};
  }

  &-warning {
    --card-color: #{$color-warning};
  }

  &-danger {
    --card-color: #{$color-danger};
  }
}

.card-icon {
  font-size: 36px;
  filter: drop-shadow(0 0 8px var(--card-color));
}

.card-content {
  flex: 1;

  .card-title {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $spacing-xs;
  }

  .card-value {
    display: flex;
    align-items: baseline;
    gap: $spacing-xs;

    .value-number {
      font-size: $font-size-xxl;
      font-weight: bold;
      color: $color-text-primary;
      font-family: 'Digital', monospace;
    }

    .value-unit {
      font-size: $font-size-sm;
      color: $color-text-muted;
    }
  }

  .card-trend {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-xs;
    margin-top: $spacing-xs;

    &.trend-up {
      color: $color-success;
    }

    &.trend-down {
      color: $color-danger;
    }

    &.trend-flat {
      color: $color-text-muted;
    }
  }
}
</style>
