# Stage 1: Build the application
FROM oven/bun:latest AS build
WORKDIR /app
COPY package.json .
COPY bun.lock .  
COPY tsconfig.json .
COPY prisma prisma
COPY src src

# Install dependencies and generate Prisma client
RUN bun install
RUN bunx prisma generate

# Build the production server
ENV NODE_ENV=production
RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

# Stage 2: Create the minimal production image
FROM gcr.io/distroless/base
WORKDIR /app
COPY --from=build /app/server server
ENV NODE_ENV=production
EXPOSE 4000
CMD ["./server"]