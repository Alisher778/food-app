import React, { Component } from "react";
import axios from "axios";

class SignIn extends Component {
	constructor() {
		super();
		this.state = { message: "Hello" };
	}

	onSubmit(e) {
		e.preventDefault();
		const form = e.target.childNodes;
		let data = {};

		form.forEach(item => Object.assign(data, { [item.name]: item.value }));
		axios
			.post("/api/restaurants", data)
			.then(res => {
				console.log(res.data);
				this.setState({ message: res.data.msg });
			})
			.catch(err => this.setState({ message: err.data.msg }));
	}

	msgFilter() {
		const msg = this.state.message.split(",");
		console.log(msg);
		msg.forEach((str, i) => {
			return <li key={i}>{str.slice(str.indexOf("%") + 1)}</li>;
		});
	}
	render() {
		return (
			<section id="sign-in-page">
				<div id="error-msg">
					<ul>{this.msgFilter()}</ul>
				</div>
				<form onSubmit={this.onSubmit.bind(this)} autoComplete="off">
					<input
						name="email"
						type="text"
						placeholder="Your Email"
						autoComplete="off"
					/>
					<input
						name="password"
						type="password"
						placeholder="Your Password"
						autoComplete="off"
					/>
					<input name="name" type="text" placeholder="Restaurant Name" />
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
					<textarea rows="10" name="info" placeholder="Short info ..." />
					<button className="form-btn">Sign Up</button>
				</form>
			</section>
		);
	}
}

export default SignIn;
