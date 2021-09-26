import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const link = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URI,
  credentials: "include",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
