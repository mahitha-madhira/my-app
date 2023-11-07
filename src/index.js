const { graphql } = require('graphql'); // Import the necessary GraphQL packages
const yourGraphQLSchema = require('./serviceA/schema');
const resolverA = require('./serviceA/resolver');
const { graphqlHTTP } = require("express-graphql");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");

const isServerless = process.env.IS_SERVERLESS === 'true';

const getResponse = async (payload) => {
    console.log("Payload", "::", payload);
    const params = JSON.parse(payload.body);

    // Execute your GraphQL query
    const result = await graphql(yourGraphQLSchema, params.query, resolverA.Query);

    let statusCode = 200;
    if (result.errors) {
        statusCode = 400;
        console.log("Error", "::", result.errors);
    }

    const response = {
        statusCode,
        body: JSON.stringify(result),
    };

    return response;
};

if (isServerless) {
    module.exports.handler = async (event, context) => {
        context.callbackWaitsForEmptyEventLoop = false;
        const response = await getResponse(event);
        return response;
    };
} else {
    const express = require("express");
    const { ApolloServer } = require("apollo-server-express");
    const { makeExecutableSchema } = require("graphql-tools");

    const app = express();

    // Merge the schemas
    const schema = makeExecutableSchema({
        typeDefs: yourGraphQLSchema,
        resolvers: resolverA,
    });

    const server = new ApolloServer({ schema });

    async function startServer() {
        await server.start();
        server.applyMiddleware({ app });
    }

    startServer().then(() => {
        app.listen(9003, () => {
            console.log(`Example app listening on port 9003`);
        });
    }).catch(error => {
        console.error('Error starting Apollo Server:', error);
    });
}