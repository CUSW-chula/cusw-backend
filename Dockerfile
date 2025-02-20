FROM oven/bun:latest
# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb for dependency installation
COPY package.json .
COPY bun.lockb .

# Copy other necessary files
COPY tsconfig.json .
COPY prisma prisma
COPY src src

# Install dependencies using bun
RUN bun install

# Set NODE_ENV to production
ENV NODE_ENV=production
ENV JWT_SECRET=4f1c59b18e0c4b2a9d0f7c28df8d346b17b882d9a8f4e6f7b2c1849a4c7e1f32f3f4a9d7e8b2c4a1d8e4c7f6b1a2d9c3
ENV MINIO_PORT=9000
ENV MINIO_ACCESS_KEY=minio
ENV DATABASE_URL=postgres://root:asd4263@host.docker.internal:5432/cusw-chula
ENV REDIS_HOST=host.docker.internal
ENV MINIO_ENDPOINT=host.docker.internal
ENV MINIO_SECRET_KEY=minio123
ENV MINIO_ROOT_USER=minio

# Generate Prisma client
RUN bunx prisma generate

# Expose port
EXPOSE 4000

# Define the command to run your application
CMD ["bun", "src/index.ts"]
