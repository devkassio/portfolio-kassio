# Apple Music (MusicKit JS) — Setup Guide

> Guia passo a passo para conectar o card "Apple Music" na seção Live.

---

## Arquitetura

```
Browser → MusicKit JS v3 (Apple CDN)
         ↓
         configure({ developerToken }) ← seu JWT
         ↓
         music.authorize()  ← pop-up Apple ID (user consent)
         ↓
         nowPlayingItem / playbackState / events
```

Tudo roda no client-side. Nenhum backend necessário.

---

## Pré-requisitos

1. **Apple Developer Account** (US$ 99/ano) — https://developer.apple.com/account
2. **MusicKit identifier** registrado
3. **Private key** (.p8) gerada para MusicKit

---

## Passo 1 — Registrar MusicKit Identifier

1. Acesse **Certificates, Identifiers & Profiles** → **Identifiers**
2. Clique **+** → selecione **MusicKit IDs** (ou **Media IDs**)
3. Description: `Kássio Portfolio`
4. Identifier: `com.kassiobarros.portfolio`
5. Salve

---

## Passo 2 — Criar a Private Key

1. Acesse **Keys** → clique **+**
2. Nome: `MusicKit Portfolio`
3. Marque **MusicKit** → selecione o identifier criado acima
4. Clique **Continue** → **Register**
5. **Baixe o arquivo `.p8`** (serve apenas UMA VEZ — guarde em local seguro)
6. Anote o **Key ID** (ex: `ABC123DEFG`)

---

## Passo 3 — Gerar o Developer Token (JWT)

O JWT precisa ser assinado com ES256 usando a private key.

### Opção A — Script Node.js (recomendado)

Crie um arquivo `generate-token.mjs` FORA do projeto:

```js
import jwt from 'jsonwebtoken';
import { readFileSync } from 'node:fs';

const TEAM_ID   = 'SEU_TEAM_ID';       // Apple Developer Team ID (10 chars)
const KEY_ID    = 'SEU_KEY_ID';         // Key ID da etapa anterior
const KEY_FILE  = './AuthKey_XXXXX.p8'; // Caminho para o .p8

const privateKey = readFileSync(KEY_FILE, 'utf8');

const token = jwt.sign({}, privateKey, {
  algorithm: 'ES256',
  expiresIn: '180d',   // máximo permitido: 6 meses
  issuer: TEAM_ID,
  header: {
    alg: 'ES256',
    kid: KEY_ID,
  },
});

console.log('VITE_APPLE_MUSIC_TOKEN=' + token);
```

```bash
npm install jsonwebtoken
node generate-token.mjs
```

### Opção B — Via Python

```python
import jwt, time

TEAM_ID  = 'SEU_TEAM_ID'
KEY_ID   = 'SEU_KEY_ID'

with open('AuthKey_XXXXX.p8') as f:
    private_key = f.read()

token = jwt.encode(
    {'iss': TEAM_ID, 'iat': int(time.time()), 'exp': int(time.time()) + 15552000},
    private_key,
    algorithm='ES256',
    headers={'kid': KEY_ID}
)
print(f'VITE_APPLE_MUSIC_TOKEN={token}')
```

```bash
pip install PyJWT cryptography
python generate_token.py
```

---

## Passo 4 — Configurar o Token no Projeto

1. Abra o arquivo `.env` na raiz do projeto
2. Cole o token gerado:

```env
VITE_APPLE_MUSIC_TOKEN=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFCQzEyM0RFRkcifQ...
```

3. Reinicie o dev server:

```bash
npm run dev
```

---

## Passo 5 — Testar

1. Abra `http://localhost:5173`
2. Scroll até a seção **Live**
3. No card "Apple Music", clique em **Conectar**
4. Um pop-up da Apple vai abrir pedindo login com Apple ID
5. Autorize o acesso
6. O card vai mostrar "Now Playing" com a música que estiver tocando no seu Apple Music

---

## Observações

### Token no Frontend
- O developer token fica exposto no bundle JS — isso é **esperado** pela Apple
- Use expiração de no máximo 6 meses
- Rotacione quando necessário (gere novo token e atualize `.env`)

### Deploy (Hostinger / Vercel / Netlify)
- Configure `VITE_APPLE_MUSIC_TOKEN` como variável de ambiente no painel do hosting
- O Vite injeta variáveis `VITE_*` no build automaticamente

### Sem Apple Developer Account?
- O card exibe fallback "Conecte para exibir seu Now Playing" — sem erros
- O hook retorna `status: 'idle'` e o card fica funcional, só sem dados

### Domínio
- MusicKit funciona em `localhost` para desenvolvimento
- Em produção, o domínio precisa estar associado ao identifier (feito automaticamente pela Apple na maioria dos casos)

---

## Troubleshooting

| Sintoma | Causa | Solução |
|---|---|---|
| Pop-up não abre | Token inválido ou expirado | Gere novo JWT |
| "MusicKit script failed" | Script bloqueado (adblock/CSP) | Whitelist `js-cdn.music.apple.com` |
| Status fica em 'loading' | Authorize cancelado pelo user | Tente novamente |
| Nenhuma música aparece | Nada tocando no Apple Music | Abra Apple Music e dê play em algo |
| Token funciona local mas não em prod | Domínio não associado | Verifique no Apple Developer Portal |

---

## Checklist

- [ ] Apple Developer Account ativa
- [ ] MusicKit Identifier registrado
- [ ] Private Key (.p8) gerada e salva em local seguro
- [ ] JWT gerado com Team ID + Key ID corretos
- [ ] Token colado em `.env` como `VITE_APPLE_MUSIC_TOKEN=...`
- [ ] Dev server reiniciado após `.env` alterado
- [ ] Botão "Conectar" funciona e abre pop-up Apple
- [ ] Now Playing exibe música em reprodução
