import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * 实时数据更新 Hook
 * @param generator 数据生成函数，基于上一次值生成新值
 * @param initialValue 初始值
 * @param interval 更新间隔（毫秒）
 */
export function useRealtimeData<T>(
  generator: (prev: T) => T,
  initialValue: T,
  interval = 3000
) {
  const data = ref(initialValue) as Ref<T>
  let timer: number | null = null

  function start() {
    stop()
    timer = window.setInterval(() => {
      data.value = generator(data.value)
    }, interval)
  }

  function stop() {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  onMounted(start)
  onUnmounted(stop)

  return { data, start, stop }
}
