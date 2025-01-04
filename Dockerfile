# Build Stage
FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY prisma ./prisma 

RUN bun install
RUN bunx prisma generate

COPY ./src ./src

ENV NODE_ENV=production

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

# Deployment Stage
FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 4000
