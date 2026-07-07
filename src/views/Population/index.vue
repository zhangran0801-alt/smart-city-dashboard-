<script setup lang="ts">
import ScreenContainer from '@/components/ScreenContainer.vue'
import ChartPanel from '@/components/ChartPanel.vue'
import DigitalClock from '@/components/DigitalClock.vue'
import NavMenu from '@/components/NavMenu.vue'
import WeatherInfo from '@/components/WeatherInfo.vue'
import PopulationRose from './PopulationRose.vue'
import GdpAreaChart from './GdpAreaChart.vue'
import IndustrySunburst from './IndustrySunburst.vue'
import RegionRadar from './RegionRadar.vue'
import { useRealtimeData } from '@/composables/useRealtimeData'
import {
  generatePopulationData,
  generateGdpData,
  generateIndustryData,
  generateRegionData,
} from '@/mock/population'

const { data: populationData } = useRealtimeData(() => generatePopulationData(), generatePopulationData(), 10000)
const { data: gdpData } = useRealtimeData(() => generateGdpData(), generateGdpData(), 15000)
const { data: industryData } = useRealtimeData(() => generateIndustryData(), generateIndustryData(), 12000)
const { data: regionData } = useRealtimeData(() => generateRegionData(), generateRegionData(), 8000)
</script>

<template>
  <ScreenContainer>
    <div class="page-layout">
      <div class="header">
        <DigitalClock />
        <h1 class="page-title">人口与经济</h1>
        <WeatherInfo />
      </div>

      <div class="main-content">
        <div class="top-section">
          <ChartPanel title="各区人口分布">
            <PopulationRose :data="populationData" />
          </ChartPanel>
          <ChartPanel title="GDP 增长趋势（近10年）">
            <GdpAreaChart :data="gdpData" />
          </ChartPanel>
        </div>

        <div class="bottom-section">
          <ChartPanel title="产业结构分析">
            <IndustrySunburst :data="industryData" />
          </ChartPanel>
          <ChartPanel title="区域综合对比">
            <RegionRadar :data="regionData" />
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

.top-section,
.bottom-section {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.footer {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-top: 1px solid $color-border-light;
  flex-shrink: 0;
}
</style>
