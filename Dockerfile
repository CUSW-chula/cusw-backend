FROM oven/bun:1.1.30

# Set working directory
WORKDIR /app

# Copy package.json first for better cache utilization
COPY package.json ./
# Copy prisma schema and push the database schema
COPY prisma ./prisma

# Install dependencies
RUN bun install

# Update package list and install openssl
RUN apt-get update && apt-get install -y openssl


# Copy the remaining application files
COPY tsconfig.json ./
COPY src ./src

# Uncomment the following line if you have public assets to copy
# COPY public ./public

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["bun", "run", "src/index.ts"]