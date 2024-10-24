FROM oven/bun:1.1.30

# Set working directory
WORKDIR /app

# Install dependencies and required system packages (including openssl)
RUN apt-get update && apt-get install -y openssl

# Copy package.json and install dependencies (optimize caching by copying only package.json first)
COPY package.json ./
RUN bun install

# Copy Prisma schema and other necessary files
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

# Uncomment the following line if you have public assets to copy
# COPY public ./public

# Run Prisma commands (db push and generate) after copying necessary files
RUN bun run db:push && bunx prisma generate

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["bun", "run", "src/index.ts"]
