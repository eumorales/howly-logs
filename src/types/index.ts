export interface Log {
  id: number
  player_uuid: string
  player_name: string
  log_type: string
  command: string
  trigger_type: string
  extra_data?: string
  timestamp: string
}

export interface FilterOptions {
  playerName: string
  startDate: string
  endDate: string
  triggerType: string
  logType: string
  content: string
  sortBy: string
  sortOrder: "asc" | "desc"
}
