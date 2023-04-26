import { ApolloServer  } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import prisma from "./prismaClient.js";

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

type LinkResponse = {
  id: string;
  url: string;
  description: string;
}

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
    post: async (_, { url, description}, context) => {
      console.log({context})
      console.log({url, description})

      if (context.token !== "aaaa") throw new Error("Not authorized");
      // if (context.token !== "aaaa") return

      const link = {
        description: description,
        url: url,
      };

      const createdLink = await prisma.link.create({
        data: link
      })

      return createdLink;
    }
  }      
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const checkToken = async (req):Promise<{token: string}> => {
  // authorizationヘッダーからトークン(jwt)を取得
  // 認可チェック
  // ユーザー情報を取得
  // contextにユーザー情報をセット
  console.log({authorization: req.headers})
  const jwtToken = req.headers.authorization || "";
  const token = jwtToken.replace("Bearer ", "");
  return { token };
}

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.authorization }),
  listen: { port: 4000 }
});;

console.log(`🚀  Server ready at: ${url}`);