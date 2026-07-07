// 通用分页参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 通用分页响应
export interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 通用 API 响应
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// 趋势方向
export type TrendDirection = 'up' | 'down' | 'flat'

// 状态级别
export type StatusLevel = 'success' | 'warning' | 'danger' | 'info'
