# Use a specific version of the Bun image
FROM oven/bun:1.1.30

# Set the working directory
WORKDIR /app

# Copy the Prisma schema and other initial files for better caching
COPY package.json ./
COPY .env .env
COPY tsconfig.json ./
COPY prisma ./prisma

# Install dependencies (will only re-run if package.json or lock files change)
RUN bun install

# Generate Prisma client
RUN bunx prisma generate

# Install OpenSSL (required by some libraries)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application files
COPY src ./src

# Uncomment if you have public assets to include
# COPY public ./public

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["bun", "run", "src/index.ts"]
