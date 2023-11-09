const { graphql } = require('graphql');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');

const yourGraphQLSchema = require('./serviceA/schema');
const resolverA = require('./serviceA/resolver');

const isServerless = process.env.IS_SERVERLESS === 'true';

// Create the executable schema
const executableSchema = makeExecutableSchema({
    typeDefs: yourGraphQLSchema,
    resolvers: resolverA,
});

// Define the getResponse function
const getResponse = async (payload) => {
    const params = typeof payload.body === 'object' ? payload.body : JSON.parse(payload.body);

    console.log('Params', '::', params);

    // Execute your GraphQL query using the executable schema
    const result = await graphql(executableSchema, params.query, resolverA.Query);

    let statusCode = 200;
    if (result.errors) {
        statusCode = 400;
        console.log('Error', '::', result.errors);
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
    const app = express();

    // Use the Apollo Server with the executable schema
    const server = new ApolloServer( {schema: executableSchema});

    app.use(express.json());

    app.post('/graphql', async (req, res) => {
        const response = await getResponse(req);
        res.status(response.statusCode).json(JSON.parse(response.body));
    });

    async function startServer() {
        await server.start();
        server.applyMiddleware({ app });
    }

    startServer().then(() => {
        app.listen(9003, () => {
            console.log('Example app listening on port 9003');
        });
    }).catch(error => {
        console.error('Error starting Apollo Server:', error);
    });
}
