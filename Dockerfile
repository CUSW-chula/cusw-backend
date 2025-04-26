FROM oven/bun:latest

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

# Expose port
EXPOSE 4000

# Define the command to run your application
CMD ["bun", "src/index.ts"]
