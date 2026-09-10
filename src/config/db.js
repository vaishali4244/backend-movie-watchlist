import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Opens the PostgreSQL connection pool.
 */
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via Prisma");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

/**
 * Closes the PostgreSQL connection pool.
 * Call this only when the application is shutting down.
 */
const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("DB disconnected via Prisma");
  } catch (error) {
    console.error("DB disconnection error:", error);
  }
};

export { prisma, connectDB, disconnectDB };