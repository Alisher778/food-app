const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

/* GET Restaurant listing. */
router.get("/", (req, res, next) => {
  Admin.find()
    .then(data => res.send(data))
    .catch(err => res.send(err.message));
});

// Create Restaurant instance
router.post("/", (req, res) => {
  const { name, dob, phone, gender, email, avatar } = req.body;
  Admin.create({ name, dob, phone, gender, email, avatar})
    .then(data => res.send(data))
    .catch(err => res.send(err.message));
});

// Update a restaurant instance by id
router.post("/edit/:id", (req, res) => {
  Admin.findByIdAndUpdate(req.params.id, {$set: req.body, updatedAt: Date.now()})
    .then(() => {
      Admin.find()
        .then(data => res.json(data))
        .catch(err => res.json(err.message));
    })
    .catch(err => res.send(err.message));
});


// Delete a restaurant instance by id
router.get("/delete/:id", (req, res) => {
  Admin.findByIdAndRemove(req.params.id)
    .then(() => {
      Admin.find()
        .then(data => res.json(data))
        .catch(err => res.json(err.message));
    })
    .catch(err => res.send(err.message));
});


// !!!!!!!!!!!!!!  ====>>>>Delete All Admin for Test Perposes only
router.get("/delete", (req, res) => {
  Admin.remove()
    .then(success => res.send(success))
    .catch(err => res.send(err.message));
});

module.exports = router;
