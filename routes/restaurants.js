var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
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
router.get("/all", isLoggedIn, (req, res, next) => {
	Restaurants.find()
		.then(data => res.send(data))
		.catch(err => res.send(err.message));
});

// Create Restaurant instance
router.post("/", (req, res) => {
	const { name, info, location, type, email, password, phone } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const passwordHash = bcrypt.hashSync(password, salt);

	Restaurants.find({ email }).then(data => {
		if (data.length === 0) {
			Restaurants.create({
				name,
				info,
				location,
				type,
				email,
				password: passwordHash,
				phone
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
			console.log("error If statement");
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

router.post("/login", (req, res) => {
	const { email, password } = req.body;

	Restaurants.find({ email })
		.then(data => {
			if (data.length > 0) {
				const passwordHash = bcrypt.compareSync(password, data[0].password);
				if (passwordHash) {
					req.session.username = data.email;
					req.session.isLogged = true;
					return data.json({
						msg: "Successfully logged in",
						isLogged: true,
						userName: data[0].email,
						userId: data[0]._id
					});
				} else {
					res.json({
						msg: "Oops! Email or Password is wrong",
						isLogged: false,
						userName: null,
						userId: null
					});
				}
			} else {
				res.json({
					msg: "There is no an account with" + email,
					isLogged: false,
					userName: null,
					userId: null
				});
			}
		})
		.catch(err => res.json(err));
});

router.get("/logout", (req, res) => {
	req.session.destroy();
	res.json({
		msg: "User Signed Out",
		isLogged: false,
		userName: null,
		userId: null
	});
});

module.exports = router;
