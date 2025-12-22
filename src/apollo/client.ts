import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const link = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
})


export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})