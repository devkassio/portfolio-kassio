# 🔴 LIVE.md — Seção Live (Dados em Tempo Real)

> Documentação técnica da seção "Live" do portfólio.

---

## 📋 Visão Geral

A seção **Live** exibe um painel com 3 cards que atualizam automaticamente usando polling inteligente. Tudo é client-side (sem backend), com warm-start via `localStorage` e degradação graciosa em caso de falha.

---

## 🃏 Cards

### Card A — Apple Music (Now Playing)

| Item | Detalhe |
|------|---------|
| **Fonte** | MusicKit JS v3 (Apple) |
| **Endpoint** | Player local do usuário (não é API REST) |
| **Autenticação** | Developer Token (JWT) + User Authorization (OAuth) |
| **Atualização** | Eventos do player: `playbackStateDidChange`, `nowPlayingItemDidChange` |
| **Opt-in** | Sim — só ativa quando o usuário clica "Conectar Apple Music" |

**Fluxo:**

1. Usuário clica "Conectar"
2. MusicKit JS é carregado sob demanda (`<script>` lazy)
3. `MusicKit.configure()` com developer token
4. `music.authorize()` abre popup Apple ID
5. Após autorização, listeners capturam mudanças de faixa e estado
6. Barra de progresso atualizada via `requestAnimationFrame`

**Estados:**

| Estado | UI |
|--------|----|
| `idle` | Botão "Conectar" + texto explicativo |
| `loading` | Skeleton animado |
| `authorized` (tocando) | Capa, faixa, artista, barra de progresso |
| `authorized` (parado) | "Nenhuma faixa tocando" |
| `unauthorized` | "Autorização não concedida" + botão retry |
| `error` | "Apple Music indisponível" + botão retry |

**Configuração do Developer Token:**

```bash
# No .env (Vite)
VITE_APPLE_MUSIC_TOKEN=seu_jwt_token_aqui
```

O developer token é um JWT assinado com a chave privada do Apple Developer Program (Music ID). Para gerar:

1. Criar um Music ID em [Apple Developer](https://developer.apple.com/account/resources/identifiers/list)
2. Criar uma chave privada para MusicKit
3. Gerar o JWT (válido por até 6 meses)
4. Colocar no `.env` como `VITE_APPLE_MUSIC_TOKEN`

**Sem token configurado:** O card mostra "Apple Music indisponível" sem erros no console.

---

### Card B — Última Atividade GitHub

| Item | Detalhe |
|------|---------|
| **Fonte** | GitHub REST API v3 (pública, sem token) |
| **Endpoint** | `GET /users/{username}/events/public?per_page=10` |
| **Rate Limit** | 60 req/h por IP (sem auth) |
| **Atualização** | Smart polling (30s base, com jitter e backoff) |

**Dados exibidos:**

- Tipo do evento (PushEvent, CreateEvent, etc.)
- Mensagem do commit (primeira linha) ou descrição do evento
- Repositório + link
- Horário relativo ("há 12 min")

**Prioridade:** PushEvent > qualquer outro evento.

---

### Card C — Status / Heartbeat

| Item | Detalhe |
|------|---------|
| **Fonte** | Métricas internas (latência do fetch, timestamp da última atualização) |
| **Atualização** | A cada 10s recalcula "última atualização" |

**Dados exibidos:**

- **Online** (sempre — é client-side)
- **Resposta:** Latência do último fetch GitHub em ms
- **Última atualização:** Timestamp relativo
- **Conexões:** "Todos os serviços OK" ou "Parcialmente indisponível"

---

## ⚙️ Motor de Polling Inteligente (`useSmartPolling`)

### Parâmetros

| Parâmetro | Default | Descrição |
|-----------|---------|-----------|
| `key` | — | Chave para localStorage |
| `fetcher` | — | Função `(signal: AbortSignal) => Promise<T>` |
| `interval` | 30s | Intervalo base entre polls |
| `staleAfter` | 120s | Threshold para marcar dados como "stale" |
| `enabled` | true | Liga/desliga o polling |

### Comportamento

```
┌──────────────────────────────────────────────────────┐
│  CICLO DE POLLING                                     │
├──────────────────────────────────────────────────────┤
│  1. Warm-start: lê localStorage imediatamente         │
│  2. Primeiro fetch ao montar                          │
│  3. Schedule próximo com interval + jitter (0-3s)     │
│  4. Em erro: backoff 2x (30s → 60s → 120s, max 4x)  │
│  5. Em sucesso: reset backoff para 1x                 │
│  6. Aba oculta: pausa polling                         │
│  7. Aba visível: fetch imediato + retoma schedule     │
│  8. AbortController: cancela request anterior         │
│  9. Stale check: a cada 10s compara updatedAt         │
└──────────────────────────────────────────────────────┘
```

### Cache

- **Escrita:** `localStorage` com `{ timestamp, data }`
- **Leitura:** No `useState` initializer (warm-start síncrono)
- **Stale:** Se `Date.now() - updatedAt > staleAfter`, badge muda para "stale"

---

## 🎨 Design

### Tokens Visuais

| Elemento | Valor |
|----------|-------|
| Grid | 3 colunas (desktop) → 2 (tablet) → 1 (mobile) |
| Card radius | `--radius-md` (20px) |
| Card padding | 24px (desktop) → 20px → 16px (mobile) |
| Min-height card | 200px (desktop), auto (mobile) |
| Gap | 24px (desktop) → 16px (mobile) |
| Hover | border-color + box-shadow (só `@media (hover: hover)`) |

### Cores dos Cards

| Card | Acento |
|------|--------|
| Apple Music | `#fc3c44` (vermelho Apple Music) |
| GitHub | `--accent-light` (azul claro) |
| Status | `#34d399` (verde) |

### Skeleton

- Shimmer animation com `background-size: 200%`
- Altura fixa para zero layout shift
- Respeita `prefers-reduced-motion`

---

## ♿ Acessibilidade

- Todos os ícones: `aria-hidden="true"`
- Botão "Conectar": `aria-label="Conectar Apple Music"`
- Badges com label descritivo
- Progress bar: `role="progressbar"` com `aria-valuenow/min/max`
- Link GitHub: `aria-label` com nome do repositório
- Tab order lógico: Header → Body → Actions
- Focus visible em todos os interativos
- `prefers-reduced-motion`: desabilita shimmer/pulse

---

## 🧪 Checklist de Testes

### Viewports

- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 768px (iPad)
- [ ] 1024px (iPad landscape)
- [ ] 1440px (Desktop)
- [ ] 1920px (Full HD)

### Cenários

- [ ] **Primeira visita:** Cards mostram skeleton → dados reais
- [ ] **Warm-start:** Revisitar mostra dados do cache imediatamente
- [ ] **Aba oculta:** Polling pausa (verificar com DevTools Network)
- [ ] **Aba visível:** Fetch imediato ao voltar
- [ ] **Rede offline:** Cards mostram cache ou erro gracioso
- [ ] **Rede lenta:** Skeleton persiste, sem timeout visual
- [ ] **API offline (GitHub 5xx):** Card mostra erro + badge stale
- [ ] **Apple Music sem token:** Card mostra "indisponível"
- [ ] **Apple Music recusado:** Card mostra "não concedida"
- [ ] **Keyboard-only:** Todos os botões/links navegáveis com Tab
- [ ] **Leitor de tela:** Badges e progress bar anunciados corretamente
- [ ] **Reduced motion:** Sem animações de shimmer/pulse

### Performance

- [ ] LiveSection chunk separado (lazy loaded)
- [ ] MusicKit JS carrega somente no clique "Conectar"
- [ ] Sem re-renders desnecessários (React DevTools Profiler)
- [ ] Sem console errors/warnings

---

## 📁 Arquivos

```
src/
├── hooks/
│   ├── useSmartPolling.js     — Motor de polling genérico
│   ├── useAppleMusic.js       — Hook MusicKit (opt-in)
│   └── useGithubActivity.js   — Hook GitHub Events
├── components/
│   └── LiveSection.jsx        — Seção completa (3 cards)
└── styles/
    └── global.css             — Estilos .live-* (~380 linhas)
```

---

*Última atualização: Fevereiro 2026*
