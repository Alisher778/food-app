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
					<button>Sign In</button>
				</form>
			</div>
		);
	}
}

export default SignIn;
