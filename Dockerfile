# Build Stage
FROM oven/bun AS build

WORKDIR /app

# Install required system libraries for Prisma
RUN apt-get update && apt-get install -y libgcc1 libssl-dev


# Cache packages installation
COPY package.json package.json
COPY prisma ./prisma 

RUN bun install
RUN bunx prisma generate

COPY ./src ./src

ENV NODE_ENV=production

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

# Deployment Stage
FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server /app/server
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/node_modules/@prisma /app/node_modules/@prisma

# Copy required system libraries for Prisma
COPY --from=build /lib/x86_64-linux-gnu/libgcc_s.so.1 /lib/libgcc_s.so.1
COPY --from=build /usr/lib/x86_64-linux-gnu/libstdc++.so.6 /usr/lib/libstdc++.so.6
COPY --from=build /usr/lib/x86_64-linux-gnu/libssl.so.1.1 /usr/lib/libssl.so.1.1
COPY --from=build /usr/lib/x86_64-linux-gnu/libcrypto.so.1.1 /usr/lib/libcrypto.so.1.1

COPY --from=build /app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 4000
