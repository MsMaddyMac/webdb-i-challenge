
const express = require('express');

// database access using knex
const db = require('../data/dbConfig');

const router = express.Router();

// return a list of accounts from db
router.get('/', (req, res) => {
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

// add an account to db
router.post('/', (req, res) => {
    const accountData = req.body;

    db('accounts')
    .insert(accountData, "id")
    .then(ids => {
        const id = ids[0];

        return db('accounts')
            .select("id", "name", "budget")
            .where({ id })
            .first()
            .then(account => {
                res
                .status(201)
                .json(account);
            });
    })
    .catch(err => {
        console.log('Error adding account.', err);
        res
        .status(500)
        .json({ error: 'Error adding account.' })
    });
});

module.exports = router;