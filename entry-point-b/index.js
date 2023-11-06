const express = require('express');
const app = express();
const httpApis = require('../src/serviceB/http-api');

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from HTTP API!' });
});

app.get('/api/hello/serverless-response', async (req, res) => {
    try {
        const responseGql = await httpApis.callServerlessGraphQLAPI();
        res.json({ message: responseGql });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`HTTP API is running on port ${PORT}`);
});
