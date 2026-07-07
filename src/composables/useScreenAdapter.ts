import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * 大屏适配 Hook - Scale 缩放方案（X/Y 独立缩放）
 * @param containerRef 容器元素引用
 * @param designWidth 设计稿宽度（默认 1920）
 * @param designHeight 设计稿高度（默认 1080）
 */
export function useScreenAdapter(
  containerRef: Ref<HTMLElement | null>,
  designWidth = 1920,
  designHeight = 1080
) {
  const scaleX = ref(1)
  const scaleY = ref(1)
  let resizeTimer: number | null = null

  function updateScale() {
    if (!containerRef.value) return

    scaleX.value = window.innerWidth / designWidth
    scaleY.value = window.innerHeight / designHeight

    // X/Y 独立缩放，铺满整个屏幕
    containerRef.value.style.transform = `scale(${scaleX.value}, ${scaleY.value})`
  }

  function handleResize() {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(updateScale, 100)
  }

  onMounted(() => {
    updateScale()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (resizeTimer) clearTimeout(resizeTimer)
  })

  return { scaleX, scaleY }
}
