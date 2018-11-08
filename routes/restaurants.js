const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Restaurants = require("../models/restaurants");
const PasswordRecovery = require("../models/passwordRecovery");


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
						msgType: 'success',
						isLogged: true,
						userName: data.email,
						userId: data._id,
						userToken: token
					});
				})
				.catch(err => {
					const msgArr = err.message.split(',');
					let msgFiltr = [];
					msgArr.forEach((msg) => msgFiltr.push(msg.slice(msg.indexOf('%')+1)));
					console.log(msgFiltr)
					res.json({
						msg: msgFiltr,
						msgType: 'danger',
						isLogged: false,
						userName: null,
						userId: null,
						userToken: null
					})
				});
		} else {
			res.json({
				msg: "A user with this email address is exist. Choose another email!",
				msgType: 'danger',
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
	const newGeneratedToken = jwt.sign({ email, password }, 'secret');
	
	Restaurants.find({ email })
		.then(data => {
			if (data.length > 0) {
				const passwordHash = bcrypt.compareSync(password, data[0].password);
				if (passwordHash) {
					req.session.username = data.email;
					req.session.isLogged = true;
					Restaurants.update({_id: data[0]._id}, {token: newGeneratedToken})
						.then(newToken => {
							return res.json({
								msg: "Successfully logged in",
								isLogged: true,
								userName: data[0].email,
								userId: data[0]._id,
								userToken: newGeneratedToken
							});
						})
					
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

router.post('/forgot-password', (req, res) => {
	/*
		1. Find a Restaurant with Email
			+ 
		2. Find Recovery Email
	*/ 
	const {email} = req.body;
	// SMTP option
	let options = {
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.GMAIL, // generated ethereal user
			pass: process.env.GMAILPASSWORD // generated ethereal password
		}
	}
	
	Restaurants.findOne({email})
		.then(data => {
			if(data) {
				const passToken = jwt.sign({ email }, 'password-recover'); //Token for password recovery
				PasswordRecovery.find({email})
					.then(foundEmail => {
						if(foundEmail.length <= 3) {
							PasswordRecovery.create({
								email: email,
								token: passToken
							}).then(token => {
								// setup email data with unicode symbols
								const recoveryButton = `<a href="/api/restaurants/edit-password/${data._id}/${email}/${passToken}">Reset Your Password</a>`;
								let mailOptions = {
									from: '"Foodifiy" <foodify@example.com>', // sender address
									to: email, // list of receivers
									subject: 'Sign In Request', // Subject line
									text: 'Hello '+email, // plain text body
									html: '<b>Hello world?</b>'+recoveryButton // html body
								};
								const transporter = nodemailer.createTransport(options);
								// send mail with defined transport object
								transporter.sendMail(mailOptions, (error, info) => {
									if (error) {	
										return res.json({msg: 'Something went wrong', status: false, msgType: 'danger'});
									}
									res.json({msg: 'Email has been sent successfully to '+email, status: true, msgType: 'success'});	
								});
							})
							.catch(err => console.log(err));
						} else {
							return res.json({msg: 'Too mutch attampt to recover your password. Try later', status: true, msgType: 'warning'});
						}
					})
					.catch(err => console.error(err));
			
			} else {
				// if no data found with email
				return res.json({msg: "No user account exist with "+email, status: false, msgType: 'danger'})
			}
		})
		.catch(err => res.json({msg: 'Something went worng', status: false, error: err.message, msgType: 'danger'}));
	
	
});

// Update restaurant sign in password
router.post("/edit-password/:id/:email/:token", (req, res) => {
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

module.exports = router;
