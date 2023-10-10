// Import required modules from the Apollo Client library
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, concat } from '@apollo/client';

// Endpoint for the GraphQL server
const GRAPHQL_ENDPOINT = 'https://good-eats-b2abe2613d0c.herokuapp.com/graphql';

// Creating an HTTP link to connect with the GraphQL server
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Middleware to handle potential authorization (e.g., JWT tokens)
const authMiddleware = new ApolloLink((operation, forward) => {

// Pass the operation to the next link in the chain
  return forward(operation);
});

// Create the Apollo Client instance with the link and cache configurations
const client = new ApolloClient({
  // Use the authentication middleware combined with the HTTP link
  link: concat(authMiddleware, httpLink),
  // Use an in-memory cache for caching GraphQL data
  cache: new InMemoryCache(),
});

// Export the Apollo Client instance to be used in other parts of the app
export default client;
