import { neon } from "@neondatabase/serverless";

const missingDatabase = async () => {
  throw new Error("DATABASE_URL is not set");
};

export const sql: any = process.env.DATABASE_URL
  ? neon(process.env.DATABASE_URL)
  : missingDatabase;
