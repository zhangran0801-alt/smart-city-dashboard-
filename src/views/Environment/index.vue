<script setup lang="ts">
import ScreenContainer from '@/components/ScreenContainer.vue'
import ChartPanel from '@/components/ChartPanel.vue'
import DigitalClock from '@/components/DigitalClock.vue'
import NavMenu from '@/components/NavMenu.vue'
import WeatherInfo from '@/components/WeatherInfo.vue'
import AqiGauge from './AqiGauge.vue'
import PmTrend from './PmTrend.vue'
import TempHumidityBar from './TempHumidityBar.vue'
import NoiseScatter from './NoiseScatter.vue'
import WaterQuality from './WaterQuality.vue'
import { useRealtimeData } from '@/composables/useRealtimeData'
import {
  generateAqiData,
  generatePmTrend,
  generateTempHumidity,
  generateNoiseData,
  generateWaterQuality,
} from '@/mock/environment'

const { data: aqiData } = useRealtimeData(() => generateAqiData(), generateAqiData(), 6000)
const { data: pmTrend } = useRealtimeData(() => generatePmTrend(), generatePmTrend(), 10000)
const { data: tempHumidity } = useRealtimeData(() => generateTempHumidity(), generateTempHumidity(), 8000)
const { data: noiseData } = useRealtimeData(() => generateNoiseData(), generateNoiseData(), 7000)
const { data: waterQuality } = useRealtimeData(() => generateWaterQuality(), generateWaterQuality(), 12000)
</script>

<template>
  <ScreenContainer>
    <div class="page-layout">
      <div class="header">
        <DigitalClock />
        <h1 class="page-title">环境监测</h1>
        <WeatherInfo />
      </div>

      <div class="main-content">
        <div class="top-section">
          <ChartPanel title="空气质量指数" class="aqi-panel">
            <AqiGauge :data="aqiData" />
          </ChartPanel>
          <ChartPanel title="PM2.5/PM10 24小时趋势" class="pm-panel">
            <PmTrend :data="pmTrend" />
          </ChartPanel>
        </div>

        <div class="middle-section">
          <ChartPanel title="各区温湿度对比">
            <TempHumidityBar :data="tempHumidity" />
          </ChartPanel>
          <ChartPanel title="噪音监测分布">
            <NoiseScatter :data="noiseData" />
          </ChartPanel>
        </div>

        <div class="bottom-section">
          <ChartPanel title="水质监测数据">
            <WaterQuality :data="waterQuality" />
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
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
}

.top-section {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 12px;
  height: 300px;
  flex-shrink: 0;
}

.middle-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  flex: 1;
  min-height: 0;
}

.bottom-section {
  height: 250px;
  flex-shrink: 0;
}

.footer {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-top: 1px solid $color-border-light;
  flex-shrink: 0;
}
</style>
