import { ref, watch, type Ref } from 'vue'

/**
 * 数字滚动动画 Hook
 * @param target 目标值（响应式）
 * @param duration 动画时长（毫秒）
 */
export function useNumberAnimation(target: Ref<number>, duration = 2000) {
  const displayValue = ref(0)
  let animationId: number | null = null

  // 缓动函数 easeOutCubic
  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3)
  }

  function animate(from: number, to: number) {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
    }

    const startTime = performance.now()

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      displayValue.value = Math.floor(from + (to - from) * easedProgress)

      if (progress < 1) {
        animationId = requestAnimationFrame(update)
      } else {
        displayValue.value = to
        animationId = null
      }
    }

    animationId = requestAnimationFrame(update)
  }

  watch(
    target,
    (newValue, oldValue) => {
      const from = oldValue ?? 0
      animate(from, newValue)
    },
    { immediate: true }
  )

  return { displayValue }
}
