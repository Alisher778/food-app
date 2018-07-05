var express = require("express");
var router = express.Router();
const Restaurants = require("../models/restaurants");

/* GET Restaurant listing. */
router.get("/all", (req, res, next) => {
  Restaurants.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

// Create Restaurant instance
router.post("/", (req, res) => {
  Restaurants.create({
    name: req.body.name,
    info: req.body.info,
    location: req.body.location,
    type: req.body.type,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    admin: [req.body.admin]
  })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => res.send(err));
});

// Delete a restaurant instance by id
router.get("/delete/:id", (req, res) => {
  console.log("Hello" + req.params.id);
  Restaurants.findByIdAndRemove(req.params.id)
    .then(() => {
      Restaurants.find()
        .then(data => {
          res.json(data);
        })
        .catch(err => res.json(err.message));
    })
    .catch(err => res.send(err.message));
});


// !!!!!!!!!!!!!!  ====>>>>Delete All Restaurants for Test Perposes only
router.get("/delete", (req, res) => {
  Restaurants.remove()
    .then(success => {
      res.send(success);
    })
    .catch(err => res.send(err));
});

module.exports = router;
