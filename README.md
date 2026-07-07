# 🏙️ 智慧城市数据大屏

> 基于 Vue 3 + TypeScript + ECharts 的智慧城市数据可视化大屏项目，展示城市交通、环境、人口经济和实时监控的综合态势。

## 🌐 在线预览

[点击访问在线演示](https://smart-city-dashboard.vercel.app)

## 🖼️ 项目截图

### 城市交通总览
三栏布局展示交通指数仪表盘、24 小时车流量趋势、城市交通态势地图、拥堵路段排行、出行方式占比和实时预警信息。

### 环境监测
空气质量指数、PM2.5/PM10 趋势、各区温湿度对比、噪音监测分布和水质监测数据。

### 人口与经济
各区人口分布玫瑰图、GDP 增长趋势、产业结构旭日图和区域综合对比雷达图。

### 实时监控
视频监控网格、设备运行状态和实时告警列表。

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **Vue 3** | Composition API + `<script setup>` 语法糖 |
| **TypeScript** | 全链路类型安全 |
| **Vite** | 极速构建工具 |
| **ECharts 5** | 按需引入，减少打包体积 |
| **SCSS** | CSS 变量主题 + mixin 复用 |
| **Vue Router 4** | SPA 路由管理 |

## 📁 项目结构

```
smart-city-dashboard/
├── src/
│   ├── composables/          # 组合式函数（核心复用层）
│   │   ├── useScreenAdapter.ts   # 大屏 scale 缩放适配
│   │   ├── useRealtimeData.ts    # 模拟实时数据更新
│   │   ├── useChartTheme.ts      # ECharts 暗色主题
│   │   └── useNumberAnimation.ts # 数字滚动动画
│   ├── components/           # 通用组件
│   │   ├── ScreenContainer.vue   # 大屏容器（缩放适配）
│   │   ├── ChartPanel.vue        # 科技感面板外壳
│   │   ├── DataCard.vue          # 数据统计卡片
│   │   ├── ScrollList.vue        # 无缝滚动列表
│   │   ├── DigitalClock.vue      # 数字时钟
│   │   └── NavMenu.vue           # 导航菜单
│   ├── views/                # 4 个页面视图
│   │   ├── TrafficOverview/      # 城市交通总览
│   │   ├── Environment/          # 环境监测
│   │   ├── Population/           # 人口与经济
│   │   └── Monitor/              # 实时监控
│   ├── mock/                 # 模拟数据
│   ├── types/                # TypeScript 类型定义
│   ├── utils/                # 工具函数
│   └── assets/styles/        # 全局样式系统
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 项目亮点

### 1. Scale 缩放适配方案
以 1920×1080 为设计基准，通过 `transform: scale()` 实现全屏自适应。相比 rem/vw 方案，所有子元素（包括 ECharts 图表）无需额外适配，保证像素级还原。

### 2. ECharts 按需引入
只引入用到的 8 种图表类型和 6 个组件，将打包体积从 1MB+ 降低到约 400KB。注册统一暗色主题 `dark-tech`。

### 3. Composables 复用层
借鉴 VueUse 设计模式，将核心逻辑抽取为 4 个 composable：
- `useScreenAdapter` — 大屏适配 + resize 节流
- `useRealtimeData<T>` — 泛型实时数据更新 + 自动清理
- `useChartTheme` — 统一图表主题配置
- `useNumberAnimation` — requestAnimationFrame 驱动的数字动画

### 4. 三层组件架构
- **通用 UI 层**：ChartPanel / DataCard / ScrollList
- **业务图表层**：TrafficGauge / PmTrend 等（统一模板结构）
- **页面编排层**：views/*/index.vue（数据编排 + 组件组装）

### 5. CSS 动画体系
脉冲动画、扫描线、呼吸灯、飞线效果、无缝滚动列表，所有动画使用 GPU 加速属性（transform/opacity）。

### 6. TypeScript 类型安全
所有 mock 数据和组件 props 都有完整的类型定义，`useRealtimeData<T>` 泛型保证数据全链路类型一致。

### 7. Vite 构建优化
配置路径别名、分包策略（echarts 和 vendor 单独拆 chunk）、SCSS 全局变量注入。

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/your-username/smart-city-dashboard.git

# 进入目录
cd smart-city-dashboard

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📐 设计规格

- 设计稿基准：**1920 × 1080px**
- 配色方案：深蓝科技风（#0a0e27 底色）
- 主色调：#00d4ff（科技蓝）
- 辅助色：#00ff88（成功绿）、#ffaa00（警告黄）、#ff4d4f（危险红）

## 📄 License

MIT
