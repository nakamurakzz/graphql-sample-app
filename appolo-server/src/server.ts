import { ApolloServer  } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

const links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: "link-1",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL1",
  }
];

const typeDefs = `#graphql
  type Query {
    info: String
    feed: [Link!]
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "Hello world!!!",
    feed: () => links,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 }});;

console.log(`🚀  Server ready at: ${url}`);