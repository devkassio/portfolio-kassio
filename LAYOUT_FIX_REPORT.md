# LAYOUT_FIX_REPORT.md — Diagnóstico e Correção

> Data: Julho 2025 | Commit anterior: `cc42eec`

---

## 1. Sintomas Reportados

- Áreas escuras/vazias grandes entre seções ao navegar por âncoras (`#sobre`, `#live`)
- Seções não renderizando corretamente até scroll manual
- Conteúdo invisível em viewports onde o IntersectionObserver não disparava

---

## 2. Root Cause — `content-visibility: auto`

### Arquivo: `src/styles/global.css` — `.section`

**Código defeituoso (ANTES):**
```css
.section {
  padding: 110px 0;
  position: relative;
  z-index: 0;
  scroll-margin-top: calc(120px + var(--safe-area-top));
  overflow: clip;
  content-visibility: auto;          /* ← CAUSA RAIZ */
  contain-intrinsic-size: auto 600px; /* ← CAUSA RAIZ */
}
```

### Por que quebrou?

1. **`content-visibility: auto`** instrui o browser a pular a renderização de seções off-screen
2. **`contain-intrinsic-size: auto 600px`** estima cada seção como 600px de altura — incorreto para seções com alturas variáveis
3. O sistema **`data-reveal`** inicia elementos com `opacity: 0` + `transform: translateY(24px)`
4. O **IntersectionObserver** (threshold: 0.1, rootMargin: 180px) pode não disparar corretamente para seções cujo conteúdo foi pulado pelo browser
5. **Resultado**: blocos escuros de 600px estimados, conteúdo invisível, posições de scroll incorretas para âncoras

### Interação destrutiva:

```
content-visibility: auto
  → browser pula renderização off-screen
  → IntersectionObserver dispara com base na posição estimada
  → .is-visible é adicionado, MAS o browser pode não pintar o conteúdo
  → overflow: clip corta qualquer overflow do conteúdo diferido
  → seção aparece como bloco vazio escuro (cor de fundo: #0a0c11)
```

---

## 3. Correção Aplicada

**Código corrigido (DEPOIS):**
```css
.section {
  padding: 110px 0;
  position: relative;
  z-index: 0;
  scroll-margin-top: calc(120px + var(--safe-area-top));
  overflow: clip;
}
```

**Propriedades removidas:**
- `content-visibility: auto` — otimização prematura para um SPA com ~10 seções
- `contain-intrinsic-size: auto 600px` — estimativa de tamanho desnecessária sem content-visibility

**Impacto na performance:**
- Negligível. O portfólio tem ~10 seções. `content-visibility: auto` é projetado para páginas com centenas de blocos off-screen (ex: feeds infinitos). Para este caso, o overhead de renderização de todas as seções é mínimo (~54 kB CSS total).

---

## 4. Bug Secundário Corrigido — Certificate Issuers

### Arquivo: `src/data/content.js`

| Certificado | Issuer ANTES | Issuer DEPOIS |
|---|---|---|
| UX & Design Thinking | Fundação Bradesco | **Udemy** |
| BPMN + BPMA + SCRUM | Fundação Bradesco | **Udemy** |
| Banco de Dados Oracle e PL/SQL | Fundação Bradesco | **Udemy** |
| GitHub Copilot | Microsoft | **Dio** |
| Mapeamento de Processos com Bizagi | Fundação Bradesco | **Udemy** |
| IA para Todos | Fundação Bradesco | **Udemy** |

---

## 5. Validação

| Check | Status |
|---|---|
| Biome: 0 erros, 0 warnings | ✅ |
| Vite build: 527 modules, 0 warnings | ✅ |
| CSS bundle: 54.36 kB (redução de 60 bytes) | ✅ |
| `content-visibility` removido de `.section` | ✅ |
| `contain-intrinsic-size` removido de `.section` | ✅ |
| 5× issuers "Fundação Bradesco" → "Udemy" | ✅ |
| 1× issuer "Microsoft" → "Dio" | ✅ |

---

## 6. Lição Aprendida

> `content-visibility: auto` NÃO deve ser usado em seções que:
> - Dependem de IntersectionObserver para animações (data-reveal)
> - São alvos de navegação por âncora (`scroll-margin-top`)
> - Têm alturas dinâmicas variáveis
> - Usam `overflow: clip` simultâneamente
>
> A propriedade é adequada apenas para listas/feeds longos com itens de tamanho previsível.
