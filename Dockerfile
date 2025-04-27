FROM oven/bun:latest AS build

# Install build dependencies
RUN apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma

# Install dependencies and generate Prisma Client for linux-musl
RUN bun install
RUN bunx prisma generate --schema=./prisma/schema.prisma

COPY src ./src
COPY generated ./generated

ENV NODE_ENV=production
RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

# ---------------------------
# Final Image with musl libc for Prisma binary engine
# ---------------------------
FROM alpine:latest AS final

# Install musl compatible runtime dependencies
RUN apk add --no-cache openssl libstdc++

WORKDIR /app

# Copy compiled server and generated Prisma Client (binary)
COPY --from=build /app/server .
COPY --from=build /app/generated ./generated

# Set environment variables for Prisma
ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/generated/libquery_engine-linux-musl-openssl-3.0.x
ENV NODE_ENV=production

CMD ["./server"]
EXPOSE 4000