var express = require("express");
var router = express.Router();
const Restaurants = require("../models/restaurants");

/* GET Restaurant listing. */
router.get("/all", (req, res, next) => {
  Restaurants.find()
    .then(data => res.send(data))
    .catch(err => res.send(err.message));
});

// Create Restaurant instance
router.post("/", (req, res) => {
  console.log("hey====",req.body)
  Restaurants.create({
    name: req.body.name,
    info: req.body.info,
    location: req.body.location,
    type: req.body.type,
    email: req.body.email,
    phone: req.body.phone,
    admin_name: req.body.admin_name,
    admin_email: req.body.admin_email,
    admin_avatar: req.body.admin_avatar,
    admin_phone: req.body.admin_phone,
    admin_lang: req.body.admin_lang,
    password: req.body.password,
    admin: [req.body.admin]
  })
    .then(data => res.send(data))
    .catch(err => res.send(err.message));
});

// Update a restaurant instance by id
router.post("/edit/:id", (req, res) => {
  Restaurants.findByIdAndUpdate(req.params.id, {$set: req.body, updatedAt: Date.now()})
    .then(() => {
      Restaurants.find()
        .then(data => res.json(data))
        .catch(err => res.json(err.message));
    })
    .catch(err => res.send(err.message));
});


// Delete a restaurant instance by id
router.get("/delete/:id", (req, res) => {
  Restaurants.findByIdAndRemove(req.params.id)
    .then(() => {
      Restaurants.find()
        .then(data => res.json(data))
        .catch(err => res.json(err.message));
    })
    .catch(err => res.send(err.message));
});


// !!!!!!!!!!!!!!  ====>>>>Delete All Restaurants for Test Perposes only
router.get("/delete", (req, res) => {
  Restaurants.remove()
    .then(success => res.send(success))
    .catch(err => res.send(err.message));
});

module.exports = router;
