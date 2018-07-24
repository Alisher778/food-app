import React, { Component } from "react";

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
	}
	render() {
		return (
			<section id="sign-in-page">
				<div id="error-msg">
					<h6>{this.state.message}</h6>
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
					<button className="form-btn">Sign In</button>
				</form>
			</section>
		);
	}
}

export default SignIn;
