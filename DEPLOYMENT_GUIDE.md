# Deployment Guide

This project is fixed for Netlify and Vercel.

## Important repo structure

Upload the CONTENTS of this ZIP directly to the GitHub repository root.

Your repo root must show:

```txt
package.json
index.html
vite.config.js
tailwind.config.js
postcss.config.js
src/
.netlify.toml is not correct; the correct file is netlify.toml
netlify.toml
.nvmrc
.node-version
vercel.json
```

Do not upload everything inside another folder.

## Netlify settings

Netlify will read `netlify.toml` automatically.

Use:

```txt
Build command: npm run build
Publish directory: dist
Node version: 24
```

The project includes:

```txt
.nvmrc
.node-version
netlify.toml
package.json engines
```

Use Node 24 to match the runtime pinned in the repository.

## Vercel settings

```txt
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

## If deploy still shows old design

Clear deploy cache and redeploy.

Netlify:
Deploys > Trigger deploy > Clear cache and deploy site

Vercel:
Project > Deployments > Redeploy > uncheck Use existing Build Cache
