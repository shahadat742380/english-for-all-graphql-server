import type { Config } from 'drizzle-kit';

export default {
  schema: "./src/schema/index.ts",
  out: "drizzle",
  dialect: "postgresql",
  driver: 'pg', // Assuming 'pg' is the correct driver for PostgreSQL
  dbCredentials: {
    user: 'postgres', // replace with your database username
    host: 'localhost', // replace with your database host
    database: 'english-for-all', // replace with your database name
    password: '742380', // replace with your database password
    port: 5432, // replace with your database port if different
  },
} satisfies Config;

