// Required node modules
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// Utilities and config imports
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Use dotenv for loading environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create an instance of the Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Allow introspection for development. (Caution: Turn off in production for security!)
    introspection: true,
    // Use authentication middleware for GraphQL context
    context: authMiddleware,
});

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets from the client build directory when in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
} else {
    // Serve the client development build for the React app when not in production
    app.use(express.static(path.join(__dirname, '../client/public')));
}

// Serve the React app's entry file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start Apollo and attach it to the Express instance
const startApollo = async () => {
    await server.start();
    server.applyMiddleware({ app });

    // Listen for database connection and then start the Express server
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API initialized on localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

startApollo();
