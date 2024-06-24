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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const PORT = Number(process.env.PORT) || 5000;
    app.use(express_1.default.json());
    // Create graphql server
    const gqlServer = new server_1.ApolloServer({
        typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
    
    `,
        resolvers: {
            Query: {
                hello: () => `Graphql server is successfully started.`,
                say: (_, { name }) => `Hey ${name}`,
            },
        },
    });
    // Start graphql server
    yield gqlServer.start();
    // graphql server endpoint
    app.use("/graphql", (0, express4_1.expressMiddleware)(gqlServer));
    app.get("/", (req, res) => {
        res.json({ message: "Server is running." });
    });
    app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
});
init();
