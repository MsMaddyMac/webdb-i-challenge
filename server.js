const express = require('express');

const AccountRouter = require('./accounts/account-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers Project.</h3>');
});

module.exports = server;