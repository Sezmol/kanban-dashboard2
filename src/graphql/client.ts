import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cltfrmfhc4x2l07uzb721uste/master",
  cache: new InMemoryCache(),
});
