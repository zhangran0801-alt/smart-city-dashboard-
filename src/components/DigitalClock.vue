<script setup lang="ts">
import { useTime } from '@/hooks/useTime'

const { time } = useTime()
</script>

<template>
  <div class="digital-clock">
    <span class="clock-date">
      {{ time.year }}-{{ String(time.month).padStart(2, '0') }}-{{
        String(time.day).padStart(2, '0')
      }}
    </span>
    <span class="clock-time">
      {{ String(time.hour).padStart(2, '0') }}:{{
        String(time.minute).padStart(2, '0')
      }}:{{ String(time.second).padStart(2, '0') }}
    </span>
    <span class="clock-week">{{ time.weekDay }}</span>
  </div>
</template>

<style scoped lang="scss">
.digital-clock {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  font-family: 'Digital', monospace;
  font-size: $font-size-xl;
  color: $color-text-primary;

  .clock-time {
    font-size: $font-size-xxl;
    color: $color-primary;
    text-shadow: 0 0 10px rgba($color-primary, 0.6);
  }

  .clock-week {
    font-size: $font-size-base;
    color: $color-text-secondary;
  }
}
</style>
