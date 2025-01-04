# Build Stage
FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install
RUN bunx prisma db push
RUN bunx prisma generate

COPY ./src ./src

ENV NODE_ENV=production

# Set environment variables passed from build arguments
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Build the Bun server
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
