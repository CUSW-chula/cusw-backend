import { PrismaClient } from "../../generated";

// Global prisma instance to ensure singleton pattern
declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// Prevent multiple instances of PrismaClient
const createPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    errorFormat: "pretty",
  });
};

// Singleton pattern for PrismaClient
const prisma = globalThis.__prisma ?? createPrismaClient();

// In development, save the instance to global to prevent hot reloads from creating new instances
if (process.env.NODE_ENV === "development") {
  globalThis.__prisma = prisma;
}

// Graceful shutdown handling
const gracefulShutdown = async () => {
  console.info("🔌 Disconnecting Prisma Client...");
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

export { prisma };
export default prisma;