import type { Log, FilterOptions } from "../types"

const API_BASE_URL = "http://localhost:3001/api"

export const fetchLogs = async (filters: FilterOptions): Promise<Log[]> => {
  const params = new URLSearchParams()

  if (filters.playerName) params.append("playerName", filters.playerName)
  if (filters.startDate) params.append("startDate", filters.startDate)
  if (filters.endDate) params.append("endDate", filters.endDate)
  if (filters.triggerType && filters.triggerType !== "Todos") params.append("triggerType", filters.triggerType)
  if (filters.logType) params.append("logType", filters.logType)
  if (filters.content) params.append("content", filters.content)
  if (filters.sortBy) params.append("sortBy", filters.sortBy)
  if (filters.sortOrder) params.append("sortOrder", filters.sortOrder)

  const response = await fetch(`${API_BASE_URL}/logs?${params}`)

  if (!response.ok) {
    throw new Error("Erro ao buscar logs")
  }

  return response.json()
}
