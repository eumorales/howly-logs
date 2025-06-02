"use client"

import React from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import type { Log } from "../types"
import { getMinecraftIcon, getPlayerHead } from "../utils/icons"
import { Search } from "lucide-react"

interface LogsTableProps {
  logs: Log[]
  loading: boolean
  onSort: (field: string, order: "asc" | "desc") => void
}

const LogsTable: React.FC<LogsTableProps> = ({ logs, loading, onSort }) => {
  const [sortField, setSortField] = React.useState("timestamp")
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc")

  const handleSort = (field: string) => {
    const newOrder = sortField === field && sortOrder === "desc" ? "asc" : "desc"
    setSortField(field)
    setSortOrder(newOrder)
    onSort(field, newOrder)
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null
    return sortOrder === "desc" ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("pt-BR")
  }

  const formatDateMobile = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const getTriggerBadgeColor = (trigger: string) => {
    switch (trigger.toLowerCase()) {
      case "chat (mensagem)":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "chat (comando)":
        return "bg-green-100 text-green-800 border-green-200"
      case "ação":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "conexão":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="p-8 sm:p-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm sm:text-base">Carregando logs...</p>
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className="p-8 sm:p-12 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Nenhum log encontrado</h3>
        <p className="text-gray-600 text-sm sm:text-base">Tente ajustar os filtros de busca</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                onClick={() => handleSort("timestamp")}
              >
                <div className="flex items-center space-x-1">
                  <span>Data</span>
                  <SortIcon field="timestamp" />
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                onClick={() => handleSort("player_name")}
              >
                <div className="flex items-center space-x-1">
                  <span>Jogador</span>
                  <SortIcon field="player_name" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Tipo</th>
              <th
                className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                onClick={() => handleSort("trigger_type")}
              >
                <div className="flex items-center space-x-1">
                  <span>Trigger</span>
                  <SortIcon field="trigger_type" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Conteúdo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">{formatDate(log.timestamp)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={getPlayerHead(log.player_name) || "/placeholder.svg"}
                      alt={log.player_name}
                      className="w-8 h-8 rounded pixelated"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=32&width=32"
                      }}
                    />
                    <span className="text-gray-900 font-medium">{log.player_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={getMinecraftIcon(log.log_type) || "/placeholder.svg"}
                      alt={log.log_type}
                      className="w-6 h-6 pixelated"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/icons/paper.png"
                      }}
                    />
                    <span className="text-gray-900 text-sm">{log.log_type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTriggerBadgeColor(log.trigger_type)}`}
                  >
                    {log.trigger_type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-gray-600 text-sm truncate" title={log.command}>
                      {log.command}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {logs.map((log) => (
          <div key={log.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={getPlayerHead(log.player_name) || "/placeholder.svg"}
                  alt={log.player_name}
                  className="w-8 h-8 rounded pixelated"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=32&width=32"
                  }}
                />
                <div>
                  <p className="font-medium text-gray-900">{log.player_name}</p>
                  <p className="text-xs text-gray-500">{formatDateMobile(log.timestamp)}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTriggerBadgeColor(log.trigger_type)}`}
              >
                {log.trigger_type}
              </span>
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <img
                src={getMinecraftIcon(log.log_type) || "/placeholder.svg"}
                alt={log.log_type}
                className="w-5 h-5 pixelated"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/icons/paper.png"
                }}
              />
              <span className="text-sm font-medium text-gray-900">{log.log_type}</span>
            </div>

            <p className="text-sm text-gray-600 break-words">{log.command}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogsTable
