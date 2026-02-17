# 📋 QUALITY.md — Documentação de Qualidade

> Registro das decisões de design, padrões de acessibilidade, performance e convenções deste portfólio.

---

## 🏗️ Arquitetura

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | React | 18.3.1 |
| Bundler | Vite | 6.4.1 |
| Linter/Formatter | Biome | 1.9.4 |
| Animação | Framer Motion | 12.x |
| Carrossel | keen-slider | 7.x |
| Formulário | react-hook-form + zod | 7.x / 3.x |
| PDF | react-pdf (pdf.js) | 9.x |
| E-mail | @emailjs/browser | 4.x |

### Estrutura de Componentes

```
App.jsx
├── Header.jsx          — Navegação sticky + mobile drawer
├── Hero.jsx            — Hero section com TypeAnimation + partículas
├── About.jsx           — Seção sobre com GitHub snapshot
├── TechStack.jsx       — Grade de tecnologias
├── Skills.jsx          — Habilidades + metodologias
├── Experience.jsx      — Timeline de experiência
├── CertificatesCarousel.jsx — Carrossel de certificados + modal PDF
│   └── PdfViewer.jsx   — Visualizador de PDF inline (lazy)
├── ProjectsCarousel.jsx — Carrossel de projetos
├── Contact.jsx         — Formulário de contato
└── Footer.jsx          — Rodapé com links sociais
```

### Hooks Customizados

| Hook | Responsabilidade |
|------|-----------------|
| `useAssetWarmup` | Pré-carrega imagens AVIF/WebP via requestIdleCallback |
| `useGithubSnapshot` | Busca dados do GitHub com cache sessionStorage (TTL 12h) |
| `useScrollReveal` | Revelação de seções via IntersectionObserver |
| `useLowPowerMode` | Detecta conexão lenta para desabilitar animações |

---

## 🎨 Design Tokens

### Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#0a0c11` | Fundo principal |
| `--color-surface` | `#11151d` | Cards e superfícies elevadas |
| `--color-text` | `#f5f7fb` | Texto principal |
| `--color-muted` | `#a9b2c5` | Texto secundário |
| `--accent-blue` | `#1c69d4` | Acento primário (links, botões) |
| `--accent-light` | `#6ad2ff` | Acento claro (destaques) |
| `--accent-red` | `#d5001c` | Acento de alerta |
| `--accent-silver` | `#d5d9e2` | Acento neutro |

### Transições

| Token | Valor | Uso |
|-------|-------|-----|
| `--transition-fast` | `0.15s ease` | Micro-interações (hover icons) |
| `--transition-base` | `0.35s cubic-bezier(0.2, 0.9, 0.2, 1)` | Transições padrão |

### Espaçamento & Raios

| Token | Valor |
|-------|-------|
| `--radius-lg` | `32px` |
| `--radius-md` | `20px` |
| `--radius-sm` | `12px` |
| `--safe-area-top/right/bottom/left` | `env(safe-area-inset-*)` |

---

## ♿ Acessibilidade (WCAG 2.1 AAA)

### Semântica HTML

- `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>` — landmarks corretos
- `<dialog>` nativo para modal de certificados (focus trap automático)
- Skip-link: `#conteudo-principal` em `App.jsx`
- `lang="pt-BR"` no `<html>`

### ARIA

| Padrão | Implementação |
|--------|--------------|
| Ícones decorativos | `aria-hidden="true"` em todos |
| Links sociais | `aria-label` descritivo (ex: "GitHub de Kássio") |
| Formulário | `<label htmlFor>`, `aria-invalid`, `aria-describedby` |
| Status do form | `<output aria-live="polite">` |
| Modal certificados | `aria-labelledby={titleId}` no `<dialog>` |
| Navegação | `<nav aria-label="Navegação principal">` |
| Seções | `Section id` alinhado com `#` dos links |

### Teclado

- **Tab**: Navegação sequencial por todos os interativos
- **Escape**: Fecha menu mobile e modal de certificados
- **←/→**: Navega páginas no PdfViewer
- **+/−**: Zoom no PdfViewer
- **Enter/Space**: Ativa botões e links

### Reduced Motion

- `MotionConfig` do Framer Motion com `reducedMotion="user"`
- `useLowPowerMode`: desabilita animações em conexões lentas
- `useScrollReveal`: respeita `prefers-reduced-motion`
- Partículas do Hero desabilitadas com reduced motion

---

## ⚡ Performance

### Code Splitting

| Chunk | Tamanho | Carregamento |
|-------|---------|-------------|
| `PdfViewer` | ~4.5 kB | Lazy (ao abrir certificado) |
| `pdf.worker` | ~1 MB | Lazy (ao renderizar PDF) |
| Main JS | ~485 kB | Imediato |
| CSS | ~48 kB (9.2 kB gzip) | Imediato |

### Imagens

- **Formato**: AVIF com fallback WebP via `<picture>`
- **Responsivas**: 3 variantes (360w, 720w, 1080w) com `srcset` + `sizes`
- **Pré-carregamento**: `useAssetWarmup` via `requestIdleCallback` com fila (concurrency=3)
- **Data Saver**: Skip de warmup quando `navigator.connection.saveData` ativo

### Otimizações CSS

- `content-visibility: auto` em seções abaixo do fold
- `contain-intrinsic-size` definido para cada seção
- Todas as animações hover envolvidas em `@media (hover: hover)` — sem sticky hover em touch
- Zero inline styles — tudo via classes CSS
- CSS minificado via Vite

### Rede

- `preconnect` para Google Fonts
- `sessionStorage` cache para GitHub API (TTL 12h) e asset warmup
- `AbortController` em fetch do GitHub
- Font stack com system-ui fallback

---

## 🛡️ Convenções de Código

### Ícones

| Biblioteca | Prefixo | Uso |
|-----------|---------|-----|
| Simple Icons | `Si*` | Marcas (GitHub, LinkedIn, React, etc.) |
| Phosphor | `Pi*` | UI (setas, download, menu, etc.) |
| Tabler | `Tb*` | Apenas VS Code (`TbBrandVscode`) |

### CSS

- **Metodologia**: BEM-like com prefixo contextual (`.hero-*`, `.about-*`, `.exp-*`)
- **Grid system**: 8px base
- **Hover guards**: Todo `:hover` com `transform` envolto em `@media (hover: hover)`
- **Mobile-first**: Breakpoints em 480px, 700px, 960px, 1100px, 1400px
- **Custom Properties**: Todas definidas em `:root`, zero variáveis indefinidas

### JavaScript/JSX

- Componentes funcionais com hooks
- `memo()` para componentes pesados (PdfViewer)
- `useCallback` para handlers passados como props
- `useMemo` para computações caras
- Imports ordenados alfabeticamente (enforced pelo Biome)
- Zero `console.log` em produção
- Zero `eval()` ou `new Function()`

---

## 🔧 Comandos

```bash
# Desenvolvimento
npm run dev

# Build de produção
npx vite build

# Lint e formatação
npx @biomejs/biome check .
npx @biomejs/biome check --write .      # auto-fix seguro
npx @biomejs/biome format --write .      # apenas formatação

# Preview build
npx vite preview
```

---

## ✅ Checklist Pré-Commit

- [ ] `npx @biomejs/biome check .` — zero erros
- [ ] `npx vite build` — build sem warnings
- [ ] Testado em mobile (Chrome DevTools)
- [ ] Testado em desktop (Chrome, Firefox)
- [ ] Navegação por teclado funcional
- [ ] Zero erros no console
- [ ] Imagens com dimensões definidas
- [ ] Links acessíveis com `aria-label`
- [ ] Ícones decorativos com `aria-hidden="true"`

---

*Última atualização: Janeiro 2026*
