import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "http://06770b634b0d.ngrok.io/graphql",
  cache: new InMemoryCache(),
});
export default client;
