FROM oven/bun:latest AS build

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb for dependency installation
COPY package.json .
COPY bun.lock .

# Copy other necessary files
COPY prisma prisma
COPY src src

# Install dependencies using bun
RUN bun install

# Generate Prisma client
RUN bunx prisma generate

ENV NODE_ENV=production

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts
    
FROM gcr.io/distroless/base

WORKDIR /app
    
COPY --from=build /app/server server
    
ENV NODE_ENV=production
    
CMD ["./server"]
    
EXPOSE 4000
