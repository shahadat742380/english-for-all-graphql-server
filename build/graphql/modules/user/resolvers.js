"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const service_1 = require("./service");
// ** import custom scalar **;
const scalar_1 = require("../../scalar");
exports.userResolvers = {
    Date: scalar_1.GraphQLDate,
    Query: {
        users: (_, { offset = 0, limit = 10 }, { db }) => service_1.userService.getUsers(db, offset, limit),
        user: (_, { id }, { db }) => service_1.userService.getUserById(db, id),
    },
    Mutation: {
        addUser: (_, { input }, { db }) => service_1.userService.addUser(db, input),
        updateUser: (_, { id, input }, { db }) => service_1.userService.updateUser(db, id, input),
        deleteUser: (_, { id }, { db }) => service_1.userService.deleteUser(db, id),
    },
};
