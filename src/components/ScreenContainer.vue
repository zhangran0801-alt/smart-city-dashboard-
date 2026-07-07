<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
  }>(),
  {
    width: 1920,
    height: 1080,
  }
)

const containerRef = ref<HTMLElement | null>(null)
let resizeTimer: number | null = null

function updateScale() {
  if (!containerRef.value) return

  const scaleX = window.innerWidth / props.width
  const scaleY = window.innerHeight / props.height

  containerRef.value.style.transform = `scale(${scaleX}, ${scaleY})`
}

function handleResize() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(updateScale, 50)
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (resizeTimer) clearTimeout(resizeTimer)
})
</script>

<template>
  <div class="screen-wrapper">
    <div ref="containerRef" class="screen-container">
      <!-- 背景网格 -->
      <div class="bg-grid"></div>
      <!-- 背景光晕 -->
      <div class="bg-glow bg-glow-1"></div>
      <div class="bg-glow bg-glow-2"></div>

      <!-- 内容区域 -->
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.screen-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: $color-bg-dark;
}

.screen-container {
  position: absolute;
  top: 0;
  left: 0;
  width: $screen-width;
  height: $screen-height;
  transform-origin: 0 0;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba($color-primary, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba($color-primary, 0.03) 1px,
      transparent 1px
    );
  background-size: 50px 50px;
  pointer-events: none;
}

.bg-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(150px);
  opacity: 0.3;
  pointer-events: none;

  &.bg-glow-1 {
    top: -200px;
    left: -200px;
    background: radial-gradient(circle, $color-primary, transparent);
  }

  &.bg-glow-2 {
    bottom: -200px;
    right: -200px;
    background: radial-gradient(circle, $color-purple, transparent);
  }
}
</style>
