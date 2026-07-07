<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    list: Array<{ id: string | number; [key: string]: any }>
    duration?: number
  }>(),
  {
    duration: 20,
  }
)

// 复制一份数据用于无缝滚动
const doubledList = computed(() => [...props.list, ...props.list])
</script>

<template>
  <div class="scroll-list-wrapper">
    <div
      class="scroll-list-content"
      :style="{ animationDuration: `${duration}s` }"
    >
      <div v-for="item in doubledList" :key="item.id" class="scroll-item">
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-list-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.scroll-list-content {
  animation: scroll-up linear infinite;

  // hover 暂停
  .scroll-list-wrapper:hover & {
    animation-play-state: paused;
  }
}

.scroll-item {
  width: 100%;
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
