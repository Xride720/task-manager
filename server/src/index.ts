
import express from "express";
import cors from "cors";
import { typeDefs } from "./graphql/schema";
import { rootResolvers } from "./graphql/resolvers";
import { ApolloServer } from "apollo-server-express";
import { applyMiddleware, IMiddleware } from "graphql-middleware";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { createServer } from 'http';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema';

import { PORT } from "./config";
import { AuthContext, authMiddleware, getUser } from "./middleware/auth";

const app = express();
const httpServer = createServer(app);
app.use(cors());

const schema = makeExecutableSchema({ typeDefs, resolvers: rootResolvers });
const schemaWithMiddleware = applyMiddleware(
  schema, 
  authMiddleware
);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
  
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({ 
  schema: schemaWithMiddleware,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
  context: AuthContext
});

async function start() {
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
}
start();
app.get('/', (req, res) => {
  console.log("Apollo GraphQL Express server is ready");
});



