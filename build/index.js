"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const d1_1 = require("drizzle-orm/d1");
const drizzle_graphql_1 = require("drizzle-graphql");
const pg_1 = require("pg");
// import schema
// import * as dbSchema from "./schema/index";
const schema_1 = require("./graphql/schema");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create a new pool instance with your PostgreSQL connection details
        const pool = new pg_1.Pool({
            user: 'postgres', // replace with your database username
            host: 'localhost', // replace with your database host
            database: 'english-for-all', // replace with your database name
            password: '742380', // replace with your database password
            port: 5432, // replace with your database port if different
        });
        // Initialize drizzle with the PostgreSQL pool and your schema
        // @ts-ignore
        const db = (0, d1_1.drizzle)(pool, { schema: schema_1.gqlSchema });
        const { schema } = (0, drizzle_graphql_1.buildSchema)(db);
        // Create an instance of ApolloServer with the generated schema
        const server = new server_1.ApolloServer({ schema });
        const { url } = yield (0, standalone_1.startStandaloneServer)(server);
        console.log(`🚀 Server ready at ${url}`);
    }
    catch (error) {
        console.error('Server initialization failed:', error);
    }
});
init();
