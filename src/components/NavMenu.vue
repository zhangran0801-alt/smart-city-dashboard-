<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface MenuItem {
  path: string
  label: string
  icon: string
}

const menuItems: MenuItem[] = [
  { path: '/traffic', label: '交通总览', icon: '🚗' },
  { path: '/environment', label: '环境监测', icon: '🌍' },
  { path: '/population', label: '人口经济', icon: '👥' },
  { path: '/monitor', label: '实时监控', icon: '📹' },
]

const route = useRoute()
const router = useRouter()

const currentPath = computed(() => route.path)

function navigate(path: string) {
  if (path !== currentPath.value) {
    router.push(path)
  }
}
</script>

<template>
  <nav class="nav-menu">
    <div
      v-for="item in menuItems"
      :key="item.path"
      class="nav-item"
      :class="{ active: currentPath === item.path }"
      @click="navigate(item.path)"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
      <div v-if="currentPath === item.path" class="nav-indicator"></div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.nav-menu {
  display: flex;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  background: $color-bg-panel;
  border: 1px solid $color-border-light;
  border-radius: $radius-lg;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-sm $spacing-lg;
  cursor: pointer;
  border-radius: $radius-md;
  transition: all 0.3s ease;

  &:hover {
    background: rgba($color-primary, 0.1);
  }

  &.active {
    background: rgba($color-primary, 0.2);

    .nav-label {
      color: $color-primary;
    }

    .nav-indicator {
      display: block;
    }
  }

  .nav-icon {
    font-size: 20px;
  }

  .nav-label {
    font-size: $font-size-base;
    color: $color-text-secondary;
    transition: color 0.3s ease;
  }

  .nav-indicator {
    display: none;
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: $color-primary;
    border-radius: 2px;
    box-shadow: 0 0 10px $color-primary;
  }
}
</style>
