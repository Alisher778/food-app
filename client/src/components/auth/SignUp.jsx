import React, { Component } from "react";

class SignIn extends Component {
	constructor() {
		super();
	}

	onSubmit(e) {
		e.preventDefault();
		const form = e.target.childNodes;
		let data = {};

		form.forEach(item => Object.assign(data, { [item.name]: item.value }));
		console.log(data);
	}
	render() {
		return (
			<div id="sign-in">
				<form onSubmit={this.onSubmit.bind(this)} autoComplete="off">
					<input name="email" type="text" placeholder="Your Email" />
					<input name="password" type="password" placeholder="Your Password" />
					<input name="name" type="text" placeholder="Restaurant Name" />
					<textarea rows="10" name="info" />
					<select name="type">
						<option value>Choose Type Of your Brand</option>
						<option value="Cafe">Cafe</option>
						<option value="Cafeteria">Cafeteria</option>
						<option value="Coffee House">Coffee House</option>
						<option value="Fast Food">Fast food</option>
						<option value="Restaurant">Restaurant</option>
					</select>
					<input name="phone" type="text" placeholder="Phone Number" />
					<input name="location" type="text" placeholder="Address" />
					<button className="form-btn">Sign Up</button>
				</form>
			</div>
		);
	}
}

export default SignIn;
