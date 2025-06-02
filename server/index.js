const express = require("express")
const mysql = require("mysql2/promise")
const cors = require("cors")

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const dbConfig = {
  host: "sql10.freesqldatabase.com",
  port: 3306,
  database: "sql10782483",
  user: "sql10782483",
  password: "YtUmptiexv",
}

app.get("/api/logs", async (req, res) => {
  try {
    const {
      playerName,
      startDate,
      endDate,
      triggerType,
      logType,
      content,
      sortBy = "timestamp",
      sortOrder = "desc",
      limit = 100,
    } = req.query

    const connection = await mysql.createConnection(dbConfig)

    let query = "SELECT * FROM player_logs WHERE 1=1"
    const params = []

    if (playerName) {
      query += " AND LOWER(player_name) LIKE LOWER(?)"
      params.push(`%${playerName}%`)
    }

    if (startDate) {
      query += " AND timestamp >= ?"
      params.push(startDate)
    }

    if (endDate) {
      query += " AND timestamp <= ?"
      params.push(endDate)
    }

    if (triggerType && triggerType !== "Todos") {
      if (triggerType === "Chat (Mensagem)") {
        query += ' AND LOWER(trigger_type) = "chat" AND LOWER(log_type) = "mensagem"'
      } else if (triggerType === "Chat (Comando)") {
        query += ' AND LOWER(trigger_type) = "chat" AND LOWER(log_type) != "mensagem"'
      } else {
        query += " AND LOWER(trigger_type) = LOWER(?)"
        params.push(triggerType)
      }
    }

    if (logType) {
      query += " AND LOWER(log_type) LIKE LOWER(?)"
      params.push(`%${logType}%`)
    }

    if (content) {
      query += " AND LOWER(command) LIKE LOWER(?)"
      params.push(`%${content}%`)
    }

    const validSortFields = ["timestamp", "player_name", "log_type", "trigger_type"]
    const validSortOrders = ["asc", "desc"]

    const safeSortBy = validSortFields.includes(sortBy) ? sortBy : "timestamp"
    const safeSortOrder = validSortOrders.includes(sortOrder) ? sortOrder : "desc"

    query += ` ORDER BY ${safeSortBy} ${safeSortOrder.toUpperCase()}`
    query += " LIMIT ?"
    params.push(Number.parseInt(limit))

    const [rows] = await connection.execute(query, params)
    await connection.end()

    res.json(rows)
  } catch (error) {
    console.error("Erro ao buscar logs:", error)
    res.status(500).json({ error: "Erro interno do servidor" })
  }
})

app.get("/api/stats", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig)

    const [totalLogs] = await connection.execute("SELECT COUNT(*) as total FROM player_logs")
    const [uniquePlayers] = await connection.execute("SELECT COUNT(DISTINCT player_name) as total FROM player_logs")
    const [logsByType] = await connection.execute(
      "SELECT log_type, COUNT(*) as count FROM player_logs GROUP BY log_type ORDER BY count DESC LIMIT 10",
    )

    await connection.end()

    res.json({
      totalLogs: totalLogs[0].total,
      uniquePlayers: uniquePlayers[0].total,
      logsByType,
    })
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    res.status(500).json({ error: "Erro interno do servidor" })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
