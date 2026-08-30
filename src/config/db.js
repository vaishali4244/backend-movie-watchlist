import "dotenv/config";

import postgres from "@prisma/orm-postgres/runtime";
import contractJson from "../prisma/contract.json" with { type: "json" };

const isDevelopment = process.env.NODE_ENV === "development";

const databaseLogger = {
  name: "database-logger",
  familyId: "sql",

  async afterExecute(plan, result) {
    const latency = Math.round(result.latencyMs);

    if (!result.completed) {
      console.error(
        `[prisma:error] Query failed in ${latency}ms · ${plan.sql}`,
      );
      return;
    }

    if (isDevelopment) {
      console.log(
        `[prisma:query] ${result.rowCount} rows in ${latency}ms · ${plan.sql}`,
      );
    }
  },
};

const db = postgres({
  contractJson,
  url: process.env.DATABASE_URL,
  middleware: [databaseLogger],
});

/**
 * Opens the PostgreSQL connection pool.
 */
const connectDB = async () => {
  try {
    await db.connect();
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
    await db.close();
    console.log("DB disconnected via Prisma");
  } catch (error) {
    console.error("DB disconnection error:", error);
  }
};

export { db, connectDB, disconnectDB };