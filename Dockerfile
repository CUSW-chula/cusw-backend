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
RUN bun install --ci --frozen-lockfile

# Generate Prisma client
RUN bunx prisma generate

# Copy application source
COPY . .

# Set build arguments
ARG DATABASE_URL
ARG NODE_ENV=production

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

# Copy entrypoint script
COPY --from=build --chown=nonroot:nonroot /app/entrypoint.sh .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000
ENV DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}"

# Set permissions and entrypoint
USER nonroot
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 4000
CMD ["./server"]