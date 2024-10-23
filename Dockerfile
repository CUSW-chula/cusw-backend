FROM oven/bun

WORKDIR /app

COPY prisma prisma
COPY package.json .

RUN bun install
RUN bun run db:push
RUN bunx prisma generate

COPY src src
COPY tsconfig.json .
# COPY public public

CMD ["bun", "src/index.ts"]

EXPOSE 4000