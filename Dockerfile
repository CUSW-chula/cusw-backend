FROM oven/bun:latest AS build

# Install OpenSSL and other build dependencies
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

# Copy Prisma Client and Engine
COPY --from=build /app/node_modules/.prisma/client ./node_modules/.prisma/client

ENV NODE_ENV=production

CMD ["./server"]
EXPOSE 4000