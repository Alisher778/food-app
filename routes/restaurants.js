const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Restaurants = require("../models/restaurants");

function isLoggedIn(req, res, next) {
	if (req.session.isLogged) {
		return next();
	}
	res.send({
		msg: "You must login first",
		isLogged: false,
		userName: null,
		userId: null,
		userToken: null
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
	const { name, info, location, type, email, password, phone} = req.body;
	const salt = bcrypt.genSaltSync(10);
	const passwordHash = bcrypt.hashSync(password, salt);
	const token = jwt.sign({ email, password }, 'secret');

	Restaurants.find({ email }).then(data => {
		if (data.length === 0) {
			Restaurants.create({
				name,
				info,
				location,
				type,
				email,
				password: passwordHash,
				phone,
				token
			})
				.then(data => {
					req.session.username = data.email;
					req.session.isLogged = true;
					res.json({
						msg: "Your account has been Successfully created",
						isLogged: true,
						userName: data.email,
						userId: data._id,
						userToken: token
					});
				})
				.catch(err =>
					res.json({
						msg: err.message,
						isLogged: false,
						userName: null,
						userId: null,
						userToken: null
					})
				);
		} else {
			console.log("error If statement");
			res.json({
				msg: "A user with this email address is exist. Choose another email!",
				isLogged: false,
				userName: null,
				userId: null,
				userToken: null
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
					return res.json({
						msg: "Successfully logged in",
						isLogged: true,
						userName: data[0].email,
						userId: data[0]._id,
						userToken: data[0].token
					});
				} else {
					res.json({
						msg: "Oops! Email or Password is wrong",
						isLogged: false,
						userName: null,
						userId: null,
						userToken: null
					});
				}
			} else {
				res.json({
					msg: "There is no an account with" + email,
					isLogged: false,
					userName: null,
					userId: null,
					userToken: null
				});
			}
		})
		.catch(err => res.json(err));
});

router.post('/verify-token', (req, res) => {
	const decoded = jwt.decode(req.body.token);
	const { email, password } = decoded;
	console.log(email)

	Restaurants.find({ email })
		.then(data => {
			if (data.length > 0) {
				const passwordHash = bcrypt.compareSync(password, data[0].password);
				console.log(passwordHash)
				if (passwordHash) {
					req.session.username = data.email;
					req.session.isLogged = true;
					console.log(passwordHash)
					return res.json({
						msg: "Successfully logged in",
						isLogged: true,
						userName: data[0].email,
						userId: data[0]._id,
						userToken: data[0].token
					});
				} else {
					res.json({
						msg: "Oops! Email or Password is wrong",
						isLogged: false,
						userName: null,
						userId: null,
						userToken: null
					});
				}
			} else {
				res.json({
					msg: "There is no an account with" + email,
					isLogged: false,
					userName: null,
					userId: null,
					userToken: null
				});
			}
		})
		.catch(err => res.json(err));
})

router.post("/logout", (req, res) => {
	req.session.destroy();
	console.log(1111,req.body)
	Restaurants.findByIdAndUpdate(req.body.userId, {token: null})
		.then(data => {
			console.log(data);
			
			res.json({
				msg: "User Signed Out",
				isLogged: false,
				userName: null,
				userId: null,
				userToken: null
			});
		})
		.catch(err => {
			res.json({
				msg: "Could not Sign Out",
				isLogged: false,
				userName: null,
				userId: null,
				userToken: null
			});
		})
	
});

module.exports = router;
