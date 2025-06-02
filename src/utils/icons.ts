// Mapeamento dos tipos de log para ícones do Minecraft
const iconMap: Record<string, string> = {
  "chat global": "/icons/sign.png",
  "chat do clã": "/icons/clay_ball.png",
  "chat da party": "/icons/arrow.png",
  "modo de jogo": "/icons/beacon.png",
  "mensagem privada": "/icons/book.png",
  give: "/icons/dropper.png",
  teleporte: "/icons/ender_pearl.png",
  "teleporte (go)": "/icons/eye_of_ender.png",
  short: "/icons/redstone.png",
  entrada: "/icons/brown_mushroom.png",
  saída: "/icons/red_mushroom.png",
  mensagem: "/icons/book.png",
  "colocou command": "/icons/command_block.png",
  "colocou bedrock": "/icons/bedrock.png",
  "quebrou command": "/icons/command_block.png",
  "quebrou bedrock": "/icons/bedrock.png",
}

export const getMinecraftIcon = (logType: string): string => {
  const normalizedType = logType.toLowerCase()
  return iconMap[normalizedType] || "/icons/paper.png"
}

export const getPlayerHead = (playerName: string): string => {
  const cleanName = playerName.replace(/[^a-zA-Z0-9_]/g, "")
  return `https://mc-heads.net/avatar/${cleanName}/32`
}

export const getPlayerHeadCrafatar = (playerName: string): string => {
  const cleanName = playerName.replace(/[^a-zA-Z0-9_]/g, "")
  return `https://crafatar.com/avatars/${cleanName}?size=32&overlay`
}

export const getPlayerSkin = (playerName: string): string => {
  const cleanName = playerName.replace(/[^a-zA-Z0-9_]/g, "")
  return `https://mc-heads.net/player/${cleanName}`
}
