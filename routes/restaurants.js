var express = require("express");
var router = express.Router();
const Restaurants = require("../models/restaurants");

router.use(require('express-session')({
  secret: "^*&(**)HBN(UOP@PJ@)P_PJ@ P@{POPIIYFUGUP{IP@UHEB BND@ &*(*)(@{)IEU&*@^&%^$#%ED@FUYIHER",
  resave: false,
  saveUnitialized: false
}))

router.use(function(req, res, next){
  res.locals.msg = "";
  res.locals.userId = req.session.userId;
  res.locals.userType = req.session.userType;
  next();
});


function isLoggedIn(req, res, next){
  if(req.session.userId){
    return next();
  }
  res.json({msg: "You must be logged in"})
  console.log(req.session.userId)
}

/* GET Restaurant listing. */
router.get("/all", (req, res, next) => {
  Restaurants.find()
    .then(data => res.send(data))
    .catch(err => res.send(err.message));
});

/* GET Current User & type of the user. */
router.get("/current_user", (req, res, next) => {
  console.log(req.session.userId);
  console.log(res.locals.msg);
  res.json(req.session.userId)
});

// Create Restaurant instance
router.post("/", (req, res) => {
  Restaurants.create({
    name: req.body.name,
    info: req.body.info,
    location: req.body.location,
    type: req.body.type,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    admin_name: req.body.admin_name,
    admin_email: req.body.admin_email,
    admin_avatar: req.body.admin_avatar,
    admin_phone: req.body.admin_phone,
    admin_lang: req.body.admin_lang,
  })
    .then(data => {
      console.log('be',data._id);
      req.session.userId = data.name;
      req.session.userType = 'admin';
      req.locals.msg = data.name;
      res.send(data)
    })
    .catch(err => res.send(err.message));
});

// Update a restaurant instance by id
router.post("/edit/:id", (req, res) => {
  console.log(req.body)
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
