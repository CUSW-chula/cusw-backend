# Start from the specified Bun image
FROM oven/bun:1.1.30

# Set working directory
WORKDIR /app

# Copy Prisma schema files early for bun install and db:push
COPY prisma ./prisma

# Copy package.json for dependency installation
COPY package.json ./

# Install dependencies
RUN bun install

# Update package list and install openssl
RUN apt-get update && apt-get install -y openssl

# Generate Prisma client
RUN bunx prisma generate

# Push Prisma schema to the database
RUN bun run db:push

# Copy the remaining application files
COPY tsconfig.json ./
COPY src ./src

# Uncomment the following line if you have public assets to copy
# COPY public ./public

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["bun", "run", "src/index.ts"]
