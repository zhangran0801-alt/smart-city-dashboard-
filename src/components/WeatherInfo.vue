<script setup lang="ts">
import { useWeather } from '@/hooks/useWeather'

const { weather } = useWeather()
</script>

<template>
  <div class="weather-info">
    <span class="weather-icon">{{ weather.icon }}</span>
    <span class="weather-condition">{{ weather.condition }}</span>
    <span class="weather-temp">{{ weather.temperature }}°C</span>
    <span class="weather-detail">{{ weather.windDirection }} {{ weather.windSpeed }}</span>
  </div>
</template>

<style scoped lang="scss">
.weather-info {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  font-size: $font-size-base;
  color: $color-text-secondary;

  .weather-icon {
    font-size: 24px;
  }

  .weather-temp {
    font-size: $font-size-lg;
    color: $color-text-primary;
    font-weight: 500;
  }

  .weather-detail {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }
}
</style>
