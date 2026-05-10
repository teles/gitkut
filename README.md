# Gitkut

Gitkut e uma pagina social retro para devs, usando dados publicos do GitHub.

Esta implementacao inicial roda localmente com:

- `api/`: Hono + TypeScript, OAuth com GitHub e cookies `httpOnly`
- `web/`: Vue + Vite, tela simples de login e exibicao do perfil

## Estrutura

```text
gitkut/
├─ api/
└─ web/
```

## Criar OAuth App no GitHub

1. Acesse GitHub > Settings > Developer settings > OAuth Apps.
2. Clique em "New OAuth App".
3. Use estes valores para desenvolvimento local:
   - Application name: `Gitkut Local`
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `http://localhost:8787/auth/github/callback`
4. Copie o `Client ID`.
5. Gere um `Client secret`.

## Configurar ambiente

Backend:

```bash
cd api
cp .env.example .env
```

Edite `api/.env`:

```env
GITHUB_CLIENT_ID=seu_client_id
GITHUB_CLIENT_SECRET=seu_client_secret
GITHUB_REDIRECT_URI=http://localhost:8787/auth/github/callback
WEB_ORIGIN=http://localhost:5173
PORT=8787
COOKIE_SECURE=false
```

Frontend:

```bash
cd web
cp .env.example .env
```

O front usa apenas a URL publica da API local:

```env
VITE_API_URL=http://localhost:8787
```

## Instalar dependencias

Na raiz do projeto:

```bash
pnpm install
```

Isso instala as dependencias de `api/` e `web/`.

Se preferir instalar separadamente:

```bash
pnpm --dir api install
pnpm --dir web install
```

## Rodar localmente

Terminal 1:

```bash
pnpm dev:api
```

API local: `http://localhost:8787`

Terminal 2:

```bash
pnpm dev:web
```

Web local: `http://localhost:5173`

Depois abra `http://localhost:5173` e clique em "Entrar com GitHub".

## Rotas da API

- `GET /auth/github`: redireciona para o login do GitHub.
- `GET /auth/github/callback`: recebe o `code`, troca por `access_token`, salva o token em cookie `httpOnly` e volta para o front.
- `GET /api/me`: retorna dados basicos do usuario autenticado.
- `GET /api/repos`: retorna repositorios publicos recentes do usuario autenticado.

O `GITHUB_CLIENT_SECRET` fica somente no backend. O frontend nunca recebe nem envia esse valor.
