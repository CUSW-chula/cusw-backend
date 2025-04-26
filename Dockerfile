FROM oven/bun:latest AS build

# Install build dependencies
RUN apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma

# Install dependencies and generate Prisma Client
RUN bun install
RUN bunx prisma generate

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
# Final Image with required libraries
# ---------------------------
FROM debian:stable-slim

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y openssl libgcc-s1 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy application files
COPY --from=build /app/server .
COPY --from=build /app/generated ./generated

# Set environment variables
ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/generated/libquery_engine-debian-openssl-1.1.x.so.node
ENV NODE_ENV=production

CMD ["./server"]
EXPOSE 4000