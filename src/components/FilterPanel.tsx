"use client"

import type React from "react"
import { Search, Calendar } from "lucide-react"
import type { FilterOptions } from "../types"

interface FilterPanelProps {
  filters: FilterOptions
  onFilterChange: (filters: Partial<FilterOptions>) => void
  onSearch: () => void
  loading: boolean
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, onSearch, loading }) => {
  const triggerTypes = ["Todos", "Chat (Mensagem)", "Chat (Comando)", "Ação", "Conexão"]

  const logTypes = [
    "",
    "chat global",
    "chat do clã",
    "chat da party",
    "modo de jogo",
    "mensagem privada",
    "give",
    "teleporte",
    "teleporte (go)",
    "short",
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <div className="space-y-4">
        {/* Grid de filtros - responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Player Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nome do Jogador</label>
            <input
              type="text"
              value={filters.playerName}
              onChange={(e) => onFilterChange({ playerName: e.target.value })}
              placeholder="Digite o nick..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Data Inicial</label>
            <div className="relative">
              <input
                type="datetime-local"
                value={filters.startDate}
                onChange={(e) => onFilterChange({ startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Data Final</label>
            <div className="relative">
              <input
                type="datetime-local"
                value={filters.endDate}
                onChange={(e) => onFilterChange({ endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Trigger Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Tipo de Trigger</label>
            <select
              value={filters.triggerType}
              onChange={(e) => onFilterChange({ triggerType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            >
              {triggerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Log Type */}
          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Tipo de Log</label>
            <select
              value={filters.logType}
              onChange={(e) => onFilterChange({ logType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="">Todos</option>
              {logTypes
                .filter((type) => type)
                .map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>

          {/* Content Search - ocupa 2 colunas em telas maiores */}
          <div className="space-y-2 sm:col-span-2 lg:col-span-2 xl:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
            <textarea
              value={filters.content}
              onChange={(e) => onFilterChange({ content: e.target.value })}
              placeholder="Buscar no conteúdo dos logs..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-sm"
            />
          </div>
        </div>

        {/* Search Button - alinhado à esquerda */}
        <div className="flex justify-start">
          <button
            onClick={onSearch}
            disabled={loading}
            className="px-6 py-2 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 min-w-[120px]"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{loading ? "Buscando..." : "Buscar"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
