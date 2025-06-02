# Minecraft Logs Viewer - Clean Edition

Sistema moderno e clean de visualização de logs do Minecraft com design preto e branco.

## 🎨 Design Features

- ✅ **Design Clean**: Preto e branco com detalhes sutis
- ✅ **Logo do Servidor**: Espaço dedicado no header
- ✅ **Cabeças dos Jogadores**: Usando API do mc-heads.net
- ✅ **Interface Minimalista**: Foco na funcionalidade
- ✅ **Ícones Lucide**: Ícones modernos e consistentes
- ✅ **Hover Effects**: Animações sutis e elegantes

## 🚀 Instalação

### 1. Frontend (React)
\`\`\`bash
npm install
npm start
\`\`\`

### 2. Backend (Node.js)
\`\`\`bash
cd server
npm install
npm start
\`\`\`

## 🎮 Funcionalidades

- ✅ **Cabeças dos Jogadores**: Automaticamente carregadas via mc-heads.net
- ✅ **Logo Personalizável**: Adicione o logo do seu servidor
- ✅ **Filtros Avançados**: Com ícones e labels claros
- ✅ **Tabela Responsiva**: Design limpo e organizado
- ✅ **Badges Coloridos**: Identificação visual dos triggers
- ✅ **Ordenação**: Clique nas colunas para ordenar

## 🔧 Personalização

### Logo do Servidor
Substitua o placeholder no header por sua logo:
\`\`\`tsx
<img
  src="/seu-logo.png"
  alt="Logo do Servidor"
  className="w-8 h-8 pixelated"
/>
\`\`\`

### APIs de Cabeças Suportadas
- **mc-heads.net** (principal): \`https://mc-heads.net/avatar/{nick}/32\`
- **Crafatar** (backup): \`https://crafatar.com/avatars/{nick}?size=32&overlay\`

## 🎯 Como usar

1. Execute o backend: \`cd server && npm start\`
2. Execute o frontend: \`npm start\`
3. Acesse: \`http://localhost:3000\`
4. Adicione sua logo na pasta \`public/\`
5. As cabeças dos jogadores carregam automaticamente

## 📱 Responsivo

- Desktop: Layout completo com todas as colunas
- Tablet: Adaptação automática dos filtros
- Mobile: Scroll horizontal na tabela

## 🎨 Paleta de Cores

- **Preto**: \`#000000\` (header, botões)
- **Branco**: \`#FFFFFF\` (background principal)
- **Cinza Claro**: \`#F8F9FA\` (backgrounds secundários)
- **Cinza Médio**: \`#6B7280\` (textos secundários)
- **Cinza Escuro**: \`#374151\` (textos principais)

## 🔍 Detalhes Técnicos

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Ícones**: Lucide React
- **API**: Express + MySQL
- **Cabeças**: mc-heads.net API
- **Responsivo**: Mobile-first design
