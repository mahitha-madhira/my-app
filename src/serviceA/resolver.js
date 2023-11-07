const yourResolverFunction = async () => {
    // Your resolver logic here
    console.log('Resolver function called');
    return 'Response from your GraphQL resolver';
};

const resolvers = {
    Query: {
        yourQueryField: yourResolverFunction,
    },
};

module.exports = resolvers;

//
// const resolvers = {
//     Query: {
//         yourQueryField: async () => {
//             // Your resolver logic here
//             return 'Response from your GraphQL resolver';
//         },
//     },
// };
//
// module.exports = resolvers;
