# Tabletop

Tablero para TTRPG (Tabletop Role-Playing Game)

- [Product domain](docs/product/domain/)

## Commands

Run from repo root:

```sh
npm install
npm run dev
npm run build
npm run preview
```

Target only the main app:

```sh
npm run dev -- --filter=main
npm run build -- --filter=main
```

Cloudflare commands:

```sh
npm run cf:preview -- --filter=main
npm run cf:deploy -- --filter=main
```

The app source and app dependencies live in `apps/main/package.json`.
