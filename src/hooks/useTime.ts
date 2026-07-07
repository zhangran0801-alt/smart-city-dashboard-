import { ref, onMounted, onUnmounted } from 'vue'

export interface TimeInfo {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  weekDay: string
  formatted: string
}

const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

export function useTime() {
  const time = ref<TimeInfo>({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    weekDay: '',
    formatted: '',
  })

  let timer: number | null = null

  function updateTime() {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')

    time.value = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
      weekDay: weekDays[now.getDay()],
      formatted: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${weekDays[now.getDay()]}`,
    }
  }

  onMounted(() => {
    updateTime()
    timer = window.setInterval(updateTime, 1000)
  })

  onUnmounted(() => {
    if (timer !== null) {
      clearInterval(timer)
    }
  })

  return { time }
}
