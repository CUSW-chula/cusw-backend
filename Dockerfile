FROM oven/bun:latest AS build

# Install OpenSSL and build dependencies
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json .
COPY bun.lock .
COPY prisma prisma
COPY src src
COPY generated generated

# Install dependencies & generate Prisma Client
RUN bun install
RUN bunx prisma generate

ENV NODE_ENV=production

# Build the server binary
RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

# Copy the built server binary
COPY --from=build /app/server server

# Copy generated Prisma Client files
COPY --from=build /app/generated ./generated

# Explicitly point to the query engine binary
ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/generated/prisma-client/libquery_engine-debian-openssl-3.0.x.so.node
ENV NODE_ENV=production

CMD ["./server"]
EXPOSE 4000