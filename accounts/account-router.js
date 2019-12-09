
const express = require('express');

// database access using knex
const db = require('../data/dbConfig');

const router = express.Router();

// GET request to return a list of all accounts from db
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

// GET request to retrieve account by specified ID
router.get('/:id', (req, res) => {
    db
    .select('*')
    .from('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
        res
        .status(200)
        .json(account);
    })
    .catch(err => {
        console.log('Error retrieving account by that ID.', err);
        res
        .status(500)
        .json({ error: 'Error retrieving account by that ID.' })
    });
});

// POST request to add an account to db
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

// PUT request to update account with specified ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    db('accounts')
    .where({ id })
    .update(updates)
    .then(count => {
        if(count > 0) {
            res
            .status(200)
            .json({ message: `${count} record(s) updated.` });
        } else {
            res
            .status(404)
            .json({ errorMessage: 'Account not found.' })
        }
    })
    .catch(err => {
        console.log('Error updating account.');
        res
        .status(500)
        .json({ error: 'Error updating account.' })
    });
});

module.exports = router;