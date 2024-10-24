FROM oven/bun:1.1.30

# Set working directory
WORKDIR /app

# Copy package.json first for better cache utilization
COPY package.json ./

# Install dependencies
RUN bun install

# Copy prisma schema and push the database schema
COPY prisma ./prisma
RUN bun run db:push
RUN bunx prisma generate

# Copy the remaining application files
COPY tsconfig.json ./
COPY src ./src

# Uncomment the following line if you have public assets to copy
# COPY public ./public

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["bun", "run", "src/index.ts"]
