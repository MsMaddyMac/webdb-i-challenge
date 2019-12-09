const express = require('express');

// database access using knex
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

// return a list of accounts from db
server.get('/', (req, res) => {
        db
        .select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200)
            .json(accounts);
        })
        .catch(err => {
            console.log('Problem retrieving accounts.', err);
            res.status(500).json({ error: 'Error getting accounts.' })
        });
});

module.exports = server;