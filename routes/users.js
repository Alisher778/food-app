const express = require('express');
const router = express.Router();
const Users = require('../models/restaurants');


router.get('/user/:id', (req, res) => {
    Users.findById(req.params.id)
        .the(user => {

        })
        .catch(err => console.error(err));
});


module.exports = router;