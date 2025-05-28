FROM node:20.17.0-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./

RUN npm install --frozen-lockfile

FROM base AS build

COPY . .

RUN npm prisma generate

RUN npm build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json ./

RUN npm install --production --frozen-lockfile

COPY --from=build /app/dist ./dist 

COPY --from=build app/prisma/__geterated__ ./prisma/__geterated__

CMD ["node", "dist/main"]