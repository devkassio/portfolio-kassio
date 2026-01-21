# Portfolio BMW - Kássio Barros

Portfólio premium com DNA BMW: visual automotivo, performance máxima e experiência sólida para impressionar recrutadores.

![Preview](public/assets/portfolio-kassio.jpg)

## Visão geral

Refeito em React + Vite com foco em performance, acessibilidade e impacto visual. Inclui seção dedicada à DavinTI, carrosséis automáticos para projetos e certificados, contato validado com EmailJS e snapshot real do GitHub.

## Destaques

- Layout BMW com paleta metálica, faixas tricolores e grid de luz.
- Seções padronizadas: Início, Sobre, DavinTI, Skills, Projetos, Certificados e Contato.
- Carrosséis automáticos com controle manual (`keen-slider`).
- Snapshot do GitHub com dados reais, cache em sessão e fallback local.
- Formulário com validação (`react-hook-form` + `zod`) e envio via EmailJS.
- Acessibilidade: skip link, foco visível e semântica consistente.

## Stack

- React + Vite
- JavaScript
- CSS moderno (design system em `src/styles/global.css`)
- Keen Slider (carrosséis)
- EmailJS
- React Hook Form + Zod (validações)
- Biome (lint/format)
- GitHub API (snapshot público)

## Estrutura principal

- `src/data/content.js` -> conteúdo central do portfólio
- `src/hooks/useGithubSnapshot.js` -> snapshot do GitHub (perfil + linguagens)
- `src/styles/global.css` -> identidade visual BMW
- `public/assets` -> imagens e mídias (inclui `public/assets/davinti-logo.jpg`)

## Como rodar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Qualidade

```bash
npm run lint
npm run format
```

## Configuração do EmailJS

As credenciais ficam em `src/components/Contact.jsx` (`serviceId`, `templateId`, `publicKey`).
Substitua pelos seus dados se necessário.

## Deploy

O `vite.config.js` usa `base: './'` para funcionar em GitHub Pages.
Se usar domínio próprio, ajuste o `base`.

---

Feito por Kássio Barros
