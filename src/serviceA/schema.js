const { buildSchema } = require('graphql');

// Define your GraphQL schema
const yourGraphQLSchema = buildSchema(`
    type Query {
        yourQueryField: String
    }
`);

module.exports = yourGraphQLSchema;
