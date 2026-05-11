# Gitkut

Gitkut e uma pagina social retro para devs, usando dados publicos do GitHub.

Esta implementacao inicial roda localmente com:

- `api/`: Cloudflare Worker + Hono + TypeScript + Wrangler, OAuth com GitHub e cookies `httpOnly`
- `web/`: Nuxt, tela de login e pagina retro do perfil

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

Para producao, use outro OAuth App ou atualize o app de producao com:

- Application name: `Gitkut`
- Homepage URL: `https://gitkut.com`
- Authorization callback URL: `https://api.gitkut.com/auth/github/callback`

GitHub OAuth Apps aceitam apenas uma callback URL cadastrada. Por isso, o fluxo
mais simples e ter um OAuth App para local e outro OAuth App para producao. Se o
GitHub mostrar que o `redirect_uri` nao esta associado ao app, confira se o
`Client ID` usado no Cloudflare pertence ao app cuja callback URL e
`https://api.gitkut.com/auth/github/callback`.

## Configurar ambiente

Backend:

```bash
cd api
cp .env.example .env
```

Edite `api/.env`:

```env
GITHUB_CLIENT_ID="seu_client_id"
GITHUB_CLIENT_SECRET="seu_client_secret"
GITHUB_CALLBACK_URL="http://localhost:8787/auth/github/callback"
FRONTEND_URL="http://localhost:5173"
CORS_ALLOWED_ORIGINS="http://localhost:5173,http://127.0.0.1:5173"
COOKIE_SECURE="false"
COOKIE_SAME_SITE="Lax"
```

O backend usa somente `api/.env` no desenvolvimento local. Nao mantenha um
segundo arquivo `api/.dev.vars`, para evitar configuracoes divergentes.
`CORS_ALLOWED_ORIGINS` aceita uma lista separada por virgula quando houver
mais de uma origem web autorizada a chamar a API com cookies.

Frontend:

```bash
cd web
cp .env.example .env
```

O front usa apenas a URL publica da API local:

```env
NUXT_PUBLIC_API_URL=http://localhost:8787
NUXT_PUBLIC_USE_MSW=false
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

## Frontend tooling

O frontend usa Nuxt em modo hibrido no Cloudflare Pages: a home autenticada
continua client-side e os perfis publicos de um segmento, como `/teles`, podem
ser renderizados com SSR na edge.

Storybook:

```bash
pnpm storybook:web
```

Storybook local: `http://localhost:6006`

Build do frontend:

```bash
pnpm build:web
```

Build do Storybook:

```bash
pnpm build-storybook:web
```

Qualidade:

```bash
pnpm format:check
pnpm test:web
pnpm typecheck:web
```

Para simular a API no frontend local com MSW:

```bash
cd web
NUXT_PUBLIC_USE_MSW=true pnpm dev
```

Sem `NUXT_PUBLIC_USE_MSW=true`, o frontend continua usando a API real em
`NUXT_PUBLIC_API_URL`.

## Backend Worker

O backend roda como Cloudflare Worker local via Wrangler.

Healthcheck:

```bash
curl http://localhost:8787/health
```

Typecheck:

```bash
pnpm typecheck:api
```

Testes:

```bash
pnpm test:api
```

D1 migrations:

```bash
pnpm db:migrations:local
pnpm db:migrations:remote
```

Deploy futuro:

```bash
pnpm deploy:api
```

Deploy do frontend no Cloudflare Pages:

```bash
pnpm build:web:prod
pnpm deploy:web
```

O build Nuxt para Cloudflare Pages gera a saida em `web/dist`, que e o
diretorio publicado no deploy direto. Headers de seguranca para assets
estaticos ficam em `web/public/_headers`; respostas SSR tambem recebem esses
headers por `web/server/middleware/security-headers.ts`.

URLs atuais:

- Frontend: `https://gitkut.com`
- Perfil publico exemplo: `https://gitkut.com/teles`
- Backend Worker: `https://api.gitkut.com`
- Callback OAuth de producao: `https://api.gitkut.com/auth/github/callback`

Em producao, configure as variaveis no Cloudflare e use secrets para valores
sensiveis:

```bash
cd api
pnpm wrangler secret put GITHUB_CLIENT_ID
pnpm wrangler secret put GITHUB_CLIENT_SECRET
```

Veja tambem `api/README.md` para os detalhes do Worker.

## Banco D1

O backend usa um banco Cloudflare D1 chamado `gitkut-db`, exposto no Worker
pelo binding `DB`.

A primeira migration cria a base social do Gitkut:

- `users`: vinculo local com o usuario do GitHub.
- `profiles`: dados editaveis do perfil Gitkut.
- `featured_repos`: repositorios fixados pelo usuario.
- `scraps`: recados entre perfis.
- `communities` e `user_communities`: comunidades e participacao.
- `badges` e `user_badges`: trofeus e conquistas.
- `profile_views_daily`: views agregadas por dia.

Durante o callback OAuth, o Worker sincroniza o usuario autenticado em
`users` e cria um `profiles` inicial quando ainda nao existir.

## Perfis publicos

Cada perfil publico usa o `slug` salvo em `profiles.slug`.

Exemplo:

```text
https://gitkut.com/teles
```

O frontend trata URLs com um unico segmento como perfil publico, exceto slugs
reservados do produto como `api`, `auth`, `settings`, `communities`,
`profile`, `repos`, `privacy` e `terms`.

Com SSR habilitado no Nuxt, essas rotas publicas sao atendidas pela propria
rota `web/src/pages/[slug].vue`, sem fallback de SPA em `_redirects`.

## Rotas da API

- `GET /health`: retorna `{ "ok": true }`.
- `GET /auth/github`: redireciona para o login do GitHub.
- `GET /auth/github/callback`: recebe o `code`, troca por `access_token`, salva o token em cookie `httpOnly` e volta para o front.
- `POST /auth/logout`: remove o cookie local de autenticacao.
- `GET /api/me`: retorna dados basicos do usuario autenticado.
- `GET /api/profile`: retorna o perfil Gitkut salvo no D1 para o usuario autenticado.
- `GET /api/profiles/:slug`: retorna um perfil publico salvo no D1 e repos publicos recentes do GitHub.
- `GET /api/repos`: retorna repositorios publicos recentes do usuario autenticado.

O `GITHUB_CLIENT_SECRET` fica somente no backend. O frontend nunca recebe nem envia esse valor.
