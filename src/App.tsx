"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown, ChevronUp, Database, AlertCircle } from "lucide-react"
import LogsTable from "./components/LogsTable"
import FilterPanel from "./components/FilterPanel"
import type { Log, FilterOptions } from "./types"
import { fetchLogs } from "./services/api"
import "./App.css"

function App() {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({
    playerName: "",
    startDate: "",
    endDate: "",
    triggerType: "Todos",
    logType: "",
    content: "",
    sortBy: "timestamp",
    sortOrder: "desc",
  })
  const [showFilters, setShowFilters] = useState(true)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      const results = await fetchLogs(filters)
      setLogs(results)
    } catch (error) {
      console.error("Erro ao buscar logs:", error)
      setError("Não foi possível conectar ao servidor. Verifique se o backend está rodando.")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-6">
              {/* Logo do Servidor */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
                  <img
                    src="howly.png"
                    alt="Logo do Servidor"
                    className="w-6 h-6 sm:w-8 sm:h-8 pixelated"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=32&width=32"
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-white">Howly</h1>
                  <p className="text-gray-300 text-xs sm:text-sm">Sistema de Logs</p>
                </div>
              </div>

              {/* Separador - oculto em mobile */}
              <div className="hidden sm:block h-8 w-px bg-gray-600"></div>

              {/* Título da Página - oculto em mobile */}
              <div className="hidden sm:flex items-center space-x-2">
                <Database className="w-5 h-5 text-gray-300" />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-3 py-2 sm:px-4 bg-white text-black hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium text-sm sm:text-base">Filtros</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Mensagem de erro */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">Erro de conexão</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
              <p className="text-red-600 text-sm mt-2">
                Verifique se o servidor backend está rodando em http://localhost:3001
              </p>
              <button
                onClick={handleSearch}
                className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 sm:mb-8">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              loading={loading}
            />
          </div>
        )}

        {/* Results */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Resultados {logs.length > 0 && <span className="text-gray-500">({logs.length} logs)</span>}
              </h2>
              {loading && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span className="text-sm">Carregando...</span>
                </div>
              )}
            </div>
          </div>

          <LogsTable
            logs={logs}
            loading={loading}
            onSort={(field, order) => handleFilterChange({ sortBy: field, sortOrder: order })}
          />
        </div>
      </div>
    </div>
  )
}

export default App
