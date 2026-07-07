<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="chart-panel">
    <!-- 标题栏 -->
    <div v-if="title" class="panel-header">
      <span class="panel-dot"></span>
      <span class="panel-title">{{ title }}</span>
      <div class="panel-line"></div>
    </div>

    <!-- 内容区域 -->
    <div class="panel-body">
      <slot />
    </div>

    <!-- 四角装饰 -->
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>

    <!-- 扫描线效果 -->
    <div class="scan-line"></div>
  </div>
</template>

<style scoped lang="scss">
.chart-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  background: $color-bg-panel;
  backdrop-filter: blur(4px);
  border: 1px solid $color-border-light;
  border-radius: $radius-sm;
  box-shadow: $shadow-glow;
  padding: $spacing-md;
  overflow: hidden;
  height: 100%;

  &:hover {
    border-color: $color-border;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding-bottom: $spacing-sm;
  border-bottom: 1px solid $color-border-light;
  flex-shrink: 0;

  .panel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $color-primary;
    box-shadow: 0 0 10px $color-primary;
    animation: pulse 2s infinite;
  }

  .panel-title {
    font-size: $font-size-lg;
    font-weight: 500;
    color: $color-text-primary;
  }

  .panel-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(
      90deg,
      $color-primary,
      transparent
    );
  }
}

.panel-body {
  flex: 1;
  min-height: 0;
  margin-top: $spacing-md;
  overflow: hidden;
}

// 四角装饰
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: $color-primary;
  border-style: solid;

  &.corner-tl {
    top: -1px;
    left: -1px;
    border-width: 2px 0 0 2px;
  }

  &.corner-tr {
    top: -1px;
    right: -1px;
    border-width: 2px 2px 0 0;
  }

  &.corner-bl {
    bottom: -1px;
    left: -1px;
    border-width: 0 0 2px 2px;
  }

  &.corner-br {
    bottom: -1px;
    right: -1px;
    border-width: 0 2px 2px 0;
  }
}

// 扫描线
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    $color-primary,
    transparent
  );
  opacity: 0.6;
  animation: scan-horizontal 3s linear infinite;
}
</style>
