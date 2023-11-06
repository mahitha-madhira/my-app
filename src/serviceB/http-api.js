const axios = require('axios');

async function callServerlessGraphQLAPI() {
    try {
        // Make a GET request to the serverless GraphQL API
        const url = 'http://localhost:3001/dev/graphql';
        const query = 'query {\n  yourQueryField\n}';
        const variables = {};

        const data = {
            query,
            variables,
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        const responseGql = await axios
            .post(url, data, { headers })
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });

        return responseGql.data;
    } catch (error) {
        console.error('Error calling serverless API:', error);
        throw error;
    }
}

module.exports = {
    callServerlessGraphQLAPI,
};
