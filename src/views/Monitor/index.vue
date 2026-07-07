<script setup lang="ts">
import ScreenContainer from '@/components/ScreenContainer.vue'
import ChartPanel from '@/components/ChartPanel.vue'
import DigitalClock from '@/components/DigitalClock.vue'
import NavMenu from '@/components/NavMenu.vue'
import WeatherInfo from '@/components/WeatherInfo.vue'
import VideoGrid from './VideoGrid.vue'
import DeviceStatus from './DeviceStatus.vue'
import AlertTable from './AlertTable.vue'
import { useRealtimeData } from '@/composables/useRealtimeData'
import {
  generateVideoFeeds,
  generateDeviceStatus,
  generateAlertList,
} from '@/mock/monitor'

const { data: videoFeeds } = useRealtimeData(() => generateVideoFeeds(), generateVideoFeeds(), 10000)
const { data: deviceStatus } = useRealtimeData(() => generateDeviceStatus(), generateDeviceStatus(), 8000)
const { data: alertList } = useRealtimeData(() => generateAlertList(), generateAlertList(), 6000)
</script>

<template>
  <ScreenContainer>
    <div class="page-layout">
      <div class="header">
        <DigitalClock />
        <h1 class="page-title">实时监控</h1>
        <WeatherInfo />
      </div>

      <div class="main-content">
        <div class="left-section">
          <ChartPanel title="视频监控">
            <VideoGrid :feeds="videoFeeds" />
          </ChartPanel>
        </div>

        <div class="right-section">
          <ChartPanel title="设备运行状态">
            <DeviceStatus :data="deviceStatus" />
          </ChartPanel>
          <ChartPanel title="实时告警列表">
            <AlertTable :alerts="alertList" />
          </ChartPanel>
        </div>
      </div>

      <div class="footer">
        <NavMenu />
      </div>
    </div>
  </ScreenContainer>
</template>

<style scoped lang="scss">
.page-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}

.header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: linear-gradient(180deg, rgba(0, 212, 255, 0.1) 0%, transparent 100%);
  border-bottom: 1px solid $color-border-light;
  flex-shrink: 0;

  .page-title {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.4);
    letter-spacing: 8px;
  }
}

.main-content {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 12px;
  padding: 12px 0;
}

.left-section {
  min-height: 0;
}

.right-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;

  > :first-child {
    flex: 1;
    min-height: 0;
  }

  > :last-child {
    flex: 1.5;
    min-height: 0;
  }
}

.footer {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-top: 1px solid $color-border-light;
  flex-shrink: 0;
}
</style>
