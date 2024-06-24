"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gqlSchema = void 0;
const schema_1 = require("@graphql-tools/schema");
// ** import types from modules
const types_1 = require("./modules/user/types");
const resolvers_1 = require("./resolvers");
const baseTypeDefs = `#graphql
  type Query
  type Mutation
`;
const typeDefs = [baseTypeDefs, types_1.userTypeDefs];
exports.gqlSchema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers: resolvers_1.resolvers,
});
