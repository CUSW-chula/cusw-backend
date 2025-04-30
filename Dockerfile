# --- Dockerfile ---

FROM oven/bun:alpine AS build

# Install build dependencies
RUN apk add --no-cache openssl


WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma

# Install dependencies and generate Prisma Client
RUN bun install
RUN bunx prisma generate

COPY src ./src
COPY --from=build /app/generated ./generated

ENV NODE_ENV=production
RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

# ---------------------------
# Final Image for musl (Alpine)
# ---------------------------
FROM alpine:latest

RUN apk add --no-cache openssl libstdc++ libgcc

WORKDIR /app

COPY --from=build /app/server .
COPY --from=build /app/generated ./generated

ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/generated/libquery_engine-linux-musl.so.node
ENV NODE_ENV=production

CMD ["./server"]
EXPOSE 4000
