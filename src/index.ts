import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { drizzle } from "drizzle-orm/d1";
import { buildSchema } from "drizzle-graphql";
import { Pool } from "pg"; 

// import schema
// import * as dbSchema from "./schema/index";
import { gqlSchema } from "./graphql/schema";

const init = async () => {
  try {
    // Create a new pool instance with your PostgreSQL connection details
    const pool = new Pool({
      user: 'postgres', // replace with your database username
      host: 'localhost', // replace with your database host
      database: 'english-for-all', // replace with your database name
      password: '742380', // replace with your database password
      port: 5432, // replace with your database port if different
    });

    // Initialize drizzle with the PostgreSQL pool and your schema
    // @ts-ignore
    const db = drizzle(pool, { schema: gqlSchema });
    const { schema } = buildSchema(db);

    // Create an instance of ApolloServer with the generated schema
    const server = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(server);

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('Server initialization failed:', error);
  }
};

init();
