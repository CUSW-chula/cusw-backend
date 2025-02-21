FROM oven/bun:latest
# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb for dependency installation
COPY package.json .
COPY bun.lock .

# Copy other necessary files
COPY tsconfig.json .
COPY prisma prisma
COPY src src

# Install dependencies using bun
RUN bun install

# Generate Prisma client
RUN bunx prisma generate

RUN bun build \
--compile \
--minify-whitespace \
--minify-syntax \
--target bun \
--outfile server \
./src/index.ts

# Expose port
EXPOSE 4000

# Define the command to run your application
CMD ["bun", "src/index.ts"]
