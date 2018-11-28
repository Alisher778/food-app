const express = require('express');
const router = express.Router();
const Users = require('../models/restaurants');

// === Find the current user by id
router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .the(user => {
            res.json(user);
        })
        .catch(err => console.error(err));
});


module.exports = router;