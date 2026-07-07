<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Hls from 'hls.js'
import type { VideoFeed } from '@/mock/monitor'

const props = defineProps<{
  feeds: VideoFeed[]
}>()

const videoRefs = ref<(HTMLVideoElement | null)[]>([])
const hlsInstances = ref<Hls[]>([])
const loadErrors = ref<Set<string>>(new Set())

// 公共视频流地址（交通监控、城市摄像头等）
const videoStreams = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
  'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8',
  'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8',
  'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
]

function initVideo(index: number) {
  const video = videoRefs.value[index]
  if (!video) return

  const streamUrl = videoStreams[index % videoStreams.length]

  // 清理旧实例
  if (hlsInstances.value[index]) {
    hlsInstances.value[index].destroy()
  }

  if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
    })

    hls.loadSource(streamUrl)
    hls.attachMedia(video)

    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) {
        console.warn(`Video ${index} load failed:`, data.type)
        loadErrors.value.add(String(index))
      }
    })

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play().catch(() => {
        // 自动播放被阻止，静音后重试
        video.muted = true
        video.play().catch(() => {})
      })
    })

    hlsInstances.value[index] = hls
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari 原生支持 HLS
    video.src = streamUrl
    video.addEventListener('loadedmetadata', () => {
      video.play().catch(() => {
        video.muted = true
        video.play().catch(() => {})
      })
    })
  }
}

onMounted(() => {
  props.feeds.forEach((_, index) => {
    initVideo(index)
  })
})

onUnmounted(() => {
  hlsInstances.value.forEach(hls => hls?.destroy())
  hlsInstances.value = []
})

watch(() => props.feeds, () => {
  // feeds 更新时重新初始化
  setTimeout(() => {
    props.feeds.forEach((_, index) => {
      initVideo(index)
    })
  }, 100)
}, { deep: true })
</script>

<template>
  <div class="video-grid">
    <div v-for="(feed, index) in feeds" :key="feed.id" class="video-item">
      <div class="video-container">
        <!-- 真实视频流 -->
        <video
          :ref="(el) => { if (el) videoRefs[index] = el as HTMLVideoElement }"
          class="video-stream"
          autoplay
          muted
          loop
          playsinline
          :class="{ 'has-error': loadErrors.has(String(index)) }"
        ></video>

        <!-- 视频加载失败时的占位 -->
        <div v-if="loadErrors.has(String(index))" class="video-fallback">
          <div class="fallback-icon">📹</div>
          <div class="fallback-text">信号接入中...</div>
        </div>

        <!-- 状态指示器 -->
        <div class="status-indicator" :class="feed.status">
          <span class="status-dot"></span>
          <span class="status-text">{{ feed.status === 'online' ? '在线' : '离线' }}</span>
        </div>

        <!-- 视频信息 -->
        <div class="video-info">
          <div class="video-name">{{ feed.name }}</div>
          <div class="video-location">{{ feed.location }}</div>
        </div>

        <!-- 扫描线动画 -->
        <div class="scan-line" v-if="feed.status === 'online' && !loadErrors.has(String(index))"></div>

        <!-- 时间戳 -->
        <div class="timestamp">{{ new Date().toLocaleTimeString('zh-CN') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  height: 100%;
  padding: 8px;
}

.video-item {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #0a0e27;
}

.video-stream {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

.video-stream.has-error {
  display: none;
}

.video-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(10, 14, 39, 0.95), rgba(0, 212, 255, 0.05));
}

.fallback-icon {
  font-size: 48px;
  margin-bottom: 12px;
  animation: pulse 2s ease-in-out infinite;
}

.fallback-text {
  font-size: 13px;
  color: #a0cfff;
  letter-spacing: 2px;
}

.status-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 10;
}

.status-indicator.online {
  color: #52c41a;
}

.status-indicator.offline {
  color: #ff4d4f;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 8px currentColor;
}

.status-indicator.online .status-dot {
  animation: pulse 2s ease-in-out infinite;
}

.video-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  z-index: 5;
}

.video-name {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
}

.video-location {
  font-size: 11px;
  color: #a0cfff;
}

.timestamp {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 10px;
  color: #00d4ff;
  background: rgba(0, 0, 0, 0.7);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  z-index: 10;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  animation: scan 3s linear infinite;
  opacity: 0.6;
  z-index: 8;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.95);
  }
}

@keyframes scan {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
