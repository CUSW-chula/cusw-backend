# Build Stage
FROM oven/bun:1.0 AS build

# Install system dependencies for Prisma
RUN apt-get update && \
    apt-get install -y \
    openssl \
    libgcc1 \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package.json  ./
COPY prisma ./prisma

# Install dependencies
RUN bun install 

# Generate Prisma client
RUN bunx prisma generate

# Copy application source
COPY . .

# Set build arguments
ARG DATABASE_URL
ARG NODE_ENV=production
ARG PORT=4000
ARG JWT_SECRET
ARG MINIO_ROOT_USER
ARG MINIO_ROOT_PASSWORD
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD

# Build application
RUN bun build \
    --compile \
    --minify \
    --target bun \
    --outfile server \
    ./src/index.ts

# Runtime Stage
FROM gcr.io/distroless/base:nonroot

WORKDIR /app

# Copy built application
COPY --from=build --chown=nonroot:nonroot /app/server /app/server
COPY --from=build --chown=nonroot:nonroot /app/prisma ./prisma

# Copy Prisma engine and client
COPY --from=build --chown=nonroot:nonroot \
    /app/node_modules/.prisma \
    /app/node_modules/.prisma
COPY --from=build --chown=nonroot:nonroot \
    /app/node_modules/@prisma \
    /app/node_modules/@prisma

# Copy required system libraries
COPY --from=build /lib/x86_64-linux-gnu/libgcc_s.so.1 /lib/
COPY --from=build /usr/lib/x86_64-linux-gnu/libstdc++.so.6 /usr/lib/
COPY --from=build /usr/lib/x86_64-linux-gnu/libssl.so.1.1 /usr/lib/
COPY --from=build /usr/lib/x86_64-linux-gnu/libcrypto.so.1.1 /usr/lib/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000
ENV DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}"
ENV JWT_SECRET = ${JWT_SECRET}
ENV MINIO_ROOT_USER = ${MINIO_ROOT_USER}
ENV MINIO_ROOT_PASSWORD = ${MINIO_ROOT_PASSWORD}
ENV POSTGRES_DB = ${POSTGRES_DB}
ENV POSTGRES_USER = ${POSTGRES_USER}
ENV POSTGRES_PASSWORD = ${POSTGRES_PASSWORD}

EXPOSE 4000
CMD ["./server"]