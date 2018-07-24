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
			<section id="sign-in-page">
				<form onSubmit={this.onSubmit.bind(this)} autoComplete="off">
					<input name="email" type="text" placeholder="Your Email" />
					<input name="password" type="password" placeholder="Your Password" />
					<button className="form-btn">Sign In</button>
				</form>
			</section>
		);
	}
}

export default SignIn;
