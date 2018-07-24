var express = require("express");
var router = express.Router();
const Restaurants = require("../models/restaurants");

function isLoggedIn(req, res, next) {
	if (req.session.isLogged) {
		return next();
	}
	res.send({
		msg: "You must login first",
		isLogged: false,
		userName: null,
		userId: null
	});
}

/* GET Restaurant listing. */
router.get("/all", (req, res, next) => {
	Restaurants.find()
		.then(data => res.send(data))
		.catch(err => res.send(err.message));
});

// Create Restaurant instance
router.post("/", (req, res) => {
	const { name, info, location, type, email, phone } = req.body;
	console.log(email);
	Restaurants.find({ email }).then(data => {
		if (data.length === 0) {
			console.log("====", data.email);
			Restaurants.create({
				name: req.body.name,
				info: req.body.info,
				location: req.body.location,
				type: req.body.type,
				email: req.body.email,
				phone: req.body.phone
			})
				.then(data => {
					req.session.username = data.email;
					req.session.isLogged = true;
					res.json({
						msg: "Your account has been Successfully created",
						isLogged: true,
						userName: data.email,
						userId: data._id
					});
				})
				.catch(err =>
					res.json({
						msg: err.message,
						isLogged: false,
						userName: null,
						userId: null
					})
				);
		} else {
			console.log("error");
			res.json({
				msg: "A user with this email address is exist. Choose another email!",
				isLogged: false,
				userName: null,
				userId: null
			});
		}
	});
});

// Update a restaurant instance by id
router.post("/edit/:id", (req, res) => {
	Restaurants.findByIdAndUpdate(req.params.id, {
		$set: req.body,
		updatedAt: Date.now()
	})
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
