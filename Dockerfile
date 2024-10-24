FROM oven/bun:1.1.30

# Set working directory
WORKDIR /app

# Install system dependencies (e.g., openssl)
RUN apt-get update && apt-get install -y openssl

# Copy package.json to avoid unnecessary cache busting
COPY package.json ./

# Copy the local node_modules (with Prisma client already generated)
COPY node_modules ./node_modules

# Copy Prisma schema, application files, and other required files
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

# Uncomment the following line if you have public assets to copy
# COPY public ./public

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["bun", "run", "src/index.ts"]
