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
    go: String
  }

  type Mutation {
    post(url: String, description: String): Link
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
    go : () => {
      return new Date().toISOString();
    }
  },
  Mutation: {
    post: (_, { url, description}, context) => {
      console.log({context})
      console.log({url, description})

      if (context.token !== "aaaa") throw new Error("Not authorized");
      // if (context.token !== "aaaa") return

      const link = {
        id: `link-${links.length++}`,
        description: description,
        url: url,
      };
      links.push(link);
      return link;
    }
  }      
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 }
});;

console.log(`🚀  Server ready at: ${url}`);