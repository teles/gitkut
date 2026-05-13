# Changelog

## v0.2.0

Released on 2026-05-13.

### Features

- **web**: extract authenticated profile to /dashboard route ([3021f18](https://github.com/teles/gitkut/commit/3021f18ef53e45d91b500aa93b9fcbe2d4bbaef8))
- **web**: add DevVibesCard with custom SVG icons to profile left sidebar ([d0b6fa2](https://github.com/teles/gitkut/commit/d0b6fa27a70729c90379268af2c1c4f04c756b1f))

### Other Changes

- chore(web): add favicon, web manifest and update nuxt config ([d38ea56](https://github.com/teles/gitkut/commit/d38ea56402dc864d2323341f4781ae59cc5238bb))

[Compare changes](https://github.com/teles/gitkut/compare/v0.1.1...v0.2.0)

## v0.1.1

Released on 2026-05-12.

### Bug Fixes

- **release**: update zero-release action to v1.1.1 ([b9bd1ee](https://github.com/teles/gitkut/commit/b9bd1ee42b1918182ee1220f6e343556c0d22d3e))

[Compare changes](https://github.com/teles/gitkut/compare/v0.1.0...v0.1.1)

## v0.1.0

Released on 2026-05-11.

### Features

- **web**: add profile loading skeletons ([d0aceb](https://github.com/teles/gitkut/commit/d0aceb1671d130ff3aa270314d67f8593a87930b))
- configure Gitkut custom domain and SSR profiles ([afddb9](https://github.com/teles/gitkut/commit/afddb9d4a39d5abe401150e10764cc4e2548071e))
- migrate web to Nuxt and tighten security headers ([9cfec9](https://github.com/teles/gitkut/commit/9cfec94cc104b56f8e3589a5b7726ea51b6a1d7d))
- add public Gitkut profile routes ([936299](https://github.com/teles/gitkut/commit/936299cff61ac779ca89dcf10e984e9f44e02616))
- **api**: add D1-backed Gitkut profile persistence ([014157](https://github.com/teles/gitkut/commit/0141576a12a0f69d66af25323b085b247d6c12d5))
- **web**: redesign landing page and fix topbar UX ([b7ab3b](https://github.com/teles/gitkut/commit/b7ab3bdf6e7c64083501681b700b10ed2694226e))
- wire frontend to real API and restructure Cloudflare Worker ([29d48d](https://github.com/teles/gitkut/commit/29d48d21bc19d7f104a4cce48e67f90cc739d227))
- **web**: build retro profile foundation ([254229](https://github.com/teles/gitkut/commit/254229d7f52e172e49668022615860a0cbea30c1))
- scaffold Gitkut OAuth prototype ([73ac3f](https://github.com/teles/gitkut/commit/73ac3faef95087494e8be83c0dca561a8ba54c99))

### Bug Fixes

- **web**: keep logged-out home during session check ([f84e42](https://github.com/teles/gitkut/commit/f84e42d7678262063f5cfad3d49139b348248ca4))
- **web**: tolerate legacy profile metadata ([59783b](https://github.com/teles/gitkut/commit/59783b3790b5a70f0afea38b2c529653fb9e6847))

### Other Changes

- ci: update deployment instructions and add deploy script for Cloudflare Builds ([05d7bf1](https://github.com/teles/gitkut/commit/05d7bf1e0f337a3a5619ef97c598ab6029bbd282))
- ci: use zero-release and prepare Nuxt tests ([90f28b](https://github.com/teles/gitkut/commit/90f28b27ced522d89db70a009a4df66c7e246d15))
