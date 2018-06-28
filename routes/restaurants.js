var express = require('express');
var router = express.Router();
var Restaurants = require('../models/restaurants');

/* GET users listing. */
router.get('/all', (req, res, next) => {
  Restaurants.find()
    .then(data => res.send(data))
    .catch(err => console.log(err))
});

router.post('/', (req, res) => {
  console.log(req.body)
  console.log(req.body.name)
  Restaurants.create({
    name: req.body.name,
    info: req.body.info,
    location: req.body.location,
    type: req.body.type,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    admin: [req.body.admin] 
  }).then(data =>{
    console.log(data)
    res.send(data)
  }).catch(err => res.send(err))
})

router.get('/delete', (req,res) => {
  Restaurants.remove()
    .then(success => {
      res.send(success)
    })
    .catch(err => res.send(err))
})

module.exports = router;
