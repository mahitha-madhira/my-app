const { graphql } = require('graphql'); // Import the necessary GraphQL packages
const yourGraphQLSchema = require('../src/serviceA/schema');
const resolvers = require('../src/serviceA/resolver');


module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const params = JSON.parse(event.body);

    // Execute your GraphQL query
    const result = await graphql(yourGraphQLSchema, params.query, resolvers);

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
