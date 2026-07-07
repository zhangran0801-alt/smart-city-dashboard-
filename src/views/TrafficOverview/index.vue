<script setup lang="ts">
import { ref } from 'vue'
import ScreenContainer from '@/components/ScreenContainer.vue'
import ChartPanel from '@/components/ChartPanel.vue'
import DigitalClock from '@/components/DigitalClock.vue'
import NavMenu from '@/components/NavMenu.vue'
import WeatherInfo from '@/components/WeatherInfo.vue'
import TrafficGauge from './TrafficGauge.vue'
import TrafficFlowTrend from './TrafficFlowTrend.vue'
import AccidentStats from './AccidentStats.vue'
import CityMap from './CityMap.vue'
import CongestionRank from './CongestionRank.vue'
import TravelModePie from './TravelModePie.vue'
import AlertList from './AlertList.vue'
import BottomStatsBar from './BottomStatsBar.vue'
import { useRealtimeData } from '@/composables/useRealtimeData'
import {
  generateTrafficIndex,
  generateTrafficFlow,
  generateCongestionRank,
  generateAccidentStats,
  generateTravelMode,
  generateAlerts,
  generateMapMarkers,
  generateBottomStats,
  updateTrafficFlow,
  updateBottomStats,
} from '@/mock/traffic'

const { data: trafficIndex } = useRealtimeData(
  () => generateTrafficIndex(),
  generateTrafficIndex(),
  5000
)

const { data: trafficFlow } = useRealtimeData(
  (prev) => updateTrafficFlow(prev),
  generateTrafficFlow(),
  3000
)

const { data: congestionRank } = useRealtimeData(
  () => generateCongestionRank(),
  generateCongestionRank(),
  8000
)

const accidentStats = ref(generateAccidentStats())
const travelMode = ref(generateTravelMode())
const alerts = ref(generateAlerts())

const { data: mapMarkers } = useRealtimeData(
  () => generateMapMarkers(),
  generateMapMarkers(),
  6000
)

const { data: bottomStats } = useRealtimeData(
  (prev) => updateBottomStats(prev),
  generateBottomStats(),
  4000
)
</script>

<template>
  <ScreenContainer>
    <div class="page-layout">
      <!-- 顶部栏 -->
      <div class="header">
        <DigitalClock />
        <h1 class="page-title">城市交通总览</h1>
        <WeatherInfo />
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <div class="left-panel">
          <ChartPanel title="今日交通指数">
            <TrafficGauge :value="trafficIndex" />
          </ChartPanel>
          <ChartPanel title="24小时车流量趋势">
            <TrafficFlowTrend :data="trafficFlow" />
          </ChartPanel>
          <ChartPanel title="近7日事故统计">
            <AccidentStats :data="accidentStats" />
          </ChartPanel>
        </div>

        <div class="center-panel">
          <ChartPanel title="城市交通态势">
            <CityMap :markers="mapMarkers" />
          </ChartPanel>
        </div>

        <div class="right-panel">
          <ChartPanel title="拥堵路段排行">
            <CongestionRank :data="congestionRank" />
          </ChartPanel>
          <ChartPanel title="出行方式占比">
            <TravelModePie :data="travelMode" />
          </ChartPanel>
          <ChartPanel title="实时预警信息">
            <AlertList :alerts="alerts" />
          </ChartPanel>
        </div>
      </div>

      <!-- 底部：统计 + 导航 -->
      <div class="footer">
        <BottomStatsBar :stats="bottomStats" />
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
  grid-template-columns: 460px 1fr 460px;
  gap: 12px;
  padding: 12px 0;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;

  > * {
    flex: 1;
    min-height: 0;
  }
}

.center-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;

  > * {
    flex: 1;
    min-height: 0;
  }
}

.footer {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  border-top: 1px solid $color-border-light;
  flex-shrink: 0;
}
</style>
