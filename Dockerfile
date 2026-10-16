# Coolify / self-host: Nitro node-server → .output/server/index.mjs
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Nitro node-server bundles runtime deps into .output
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]
